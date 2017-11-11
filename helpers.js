import { Notifications, Permissions } from 'expo'
import { resetNotifcation, setNotification } from './actions'

export function clearLocalNotification(dispatch) {
  console.log('clearing notification')

  dispatch(resetNotifcation())
  return Notifications.cancelAllScheduledNotificationsAsync
}

function createNotification() {
  return {
    title: 'Log your stats!',
    body: '👋 don\'t forget to answer a quizz today!',
    ios: {
      sound: false
    },
    android: {
      sound: false,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification(dispatch, currentNotificationStatus) {
  if (currentNotificationStatus === null) {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        let nextDate = new Date()
        nextDate.setDate(nextDate.getDate() + 1)
        nextDate.setHours(20)
        nextDate.setMinutes(0)

        // let nextDate = new Date()
        // nextDate.setSeconds(nextDate.getSeconds() + 15)

        Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time: nextDate,
          repeat: 'day'
        })

        dispatch(setNotification())
      }
    })
  }
}
