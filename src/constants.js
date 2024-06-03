const constants = {
    'COINS' : [
        {   
            "type_of_coin" : "BTC",
            "current_price" : '$10', 
            "market_trade_volume" : "1000", 
            "intra_day_high_price": "$12" 

        },

        {   
            "type_of_coin" : "DOGE",
            "current_price" : '$1', 
            "market_trade_volume" : "100", 
            "intra_day_high_price": "$2" 

        }
    ],
    
    
    'notifications' : [
        {   
            'id' : 1,
            'type' : 'sent',
            'sent_email' : 'arin@coin.com',
            'created_at' : '2024-02-10 10:10:10',
            "line_items" : {
                "type_of_coin" : "BTC",
                "current_price" : '$10', 
                "market_trade_volume" : "1000", 
                "intra_day_high_price": "$12" 
                
            }
        },
    
        {   
            'id' : 2,
            'type' : 'sent',
            'sent_email' : 'arin@coin.com',
            'created_at' : '2024-02-10 10:10:10',
            "line_items" : {
                "type_of_coin" : "BTC",
                "current_price" : '$10', 
                "market_trade_volume" : "1000", 
                "intra_day_high_price": "$12" 
                
            }
        },
    
        {   
            'id' : 3,
            'type' : 'failed',
            'sent_email' : 'arin@coin.com',
            'created_at' : '2024-02-10 10:10:10'
        },
    
        {   
            'id' : 4,
            'type' : 'outstanding',
            'sent_email' : 'arin@coin.com',
            'created_at' : '2024-08-10 10:10:10'
        },
    
        {   
            'id' : 5,
            'type' : 'sent',
            'sent_email' : 'din@coin.com',
            'created_at' : '2024-05-10 10:10:10'
        }
    
    ],

    'users' : [
        {
            'name' :'Arun',
            'email' : 'arunsharma@coin.com',
            'subscribed_to' : ['BTC']
        },


        {
            
            'name' :'Dinshaw',
            'email' : 'Dinshaw@coin.com',
            'subscribed_to' : ['DOGE']
        }

    ]
}
module.exports = constants