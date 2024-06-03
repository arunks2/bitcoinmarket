// dataService.js
const constants = require('../constants');

class DataService {
  constructor() {
    this.notifications = constants.notifications;
    this.users = constants.users;
    this.coins = constants.COINS;
  }

  getNotifications() {
    return this.notifications;
  }

  getNotificationById(id) {
    const notification = this.notifications.find(notification => notification.id === id);
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  addNotification(notification) {
    if (!notification.id || !notification.sent_email || !notification.created_at) {
      throw new Error('Invalid notification object');
    }
    this.notifications.push(notification);
  }

  updateNotification(id, updatedFields) {
    const notification = this.getNotificationById(id);
    Object.assign(notification, updatedFields);
  }

  deleteNotification(id) {
    const index = this.notifications.findIndex(notification => notification.id === id);
    if (index === -1) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    this.notifications.splice(index, 1);
  }

  getUsersSubscribedToCoin(coin) {
    return this.users.filter(user => user.subscribed_to.includes(coin));
  }
}

module.exports = new DataService();
