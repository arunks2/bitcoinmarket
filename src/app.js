const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dataService = require('./services/dataservice');
const sendEmail = require('./services/mailservice')

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));



// Create a notification
app.post('/notification', (req, res) => {
  try {
    const { type_of_coin, current_price, market_trade_volume, intra_day_high_price } = req.body;

    if (!type_of_coin || !current_price || !market_trade_volume || !intra_day_high_price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const subscribed_users = dataService.getUsersSubscribedToCoin(type_of_coin);
    const to_sent_notifications = [];
    let index = dataService.getNotifications().length > 0 ? dataService.getNotifications().slice(-1)[0].id : 0;

    for (let user of subscribed_users) {
      let notification = {
        id: index + 1,
        type: 'outstanding',
        sent_email: user.email,
        created_at: new Date().toISOString(),
        line_items: {
          type_of_coin,
          current_price,
          market_trade_volume,
          intra_day_high_price
        }
      };
      index += 1;
      dataService.addNotification(notification);
      to_sent_notifications.push(notification);
    }

    res.status(201).json({ notifications: to_sent_notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a notification
app.post('/send-notification/:id', async (req, res) => {
  try {
    const notification = dataService.getNotificationById(req.params.id);
    const { sent_email, line_items } = notification;
    const subject = `Crypto Notification for ${line_items.type_of_coin}`;
    const text = `Current Price: ${line_items.current_price}\nMarket Trade Volume: ${line_items.market_trade_volume}\nIntra Day High Price: ${line_items.intra_day_high_price}`;

    await sendEmail(sent_email, subject, text);
    dataService.updateNotification(req.params.id, { type: 'sent' });
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message });
    } else {
      dataService.updateNotification(req.params.id, { type: 'failed' });
      res.status(500).json({ message: 'Failed to send notification' });
    }
  }
});

// List notifications
app.get('/notifications', (req, res) => {
  try {
    const notifications = dataService.getNotifications();
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a notification
app.delete('/notification/:id', (req, res) => {
  try {
    dataService.deleteNotification(req.params.id);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
