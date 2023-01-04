import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Vini',
    'user_email': 'vinifragam@gmail.com'
  });
}