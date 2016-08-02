import Tracking     from 'actions/brand_play_tracking_actions';

export default {
    track(url) { 
        let medscape = "medscape.com",
            internal_link = url.indexOf(medscape),
            identifier_link = "",
            event_link = "";
        
        if (internal_link > -1){
            identifier_link = "INTLINK_";
            event_link = "vidvbp-intlink";
        }
        else{
            identifier_link = "EXTLINK_";
            event_link = "vidvbp-extlink";
        }

        return function() {
            Tracking.trackLink({
                identifier: identifier_link + url,
                event: event_link
            });
        };
    },
};