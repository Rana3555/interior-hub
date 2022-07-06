package io.ionic.starter;

import android.content.Intent;
import androidx.annotation.NonNull;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
public class FirebasePushNotification extends FirebaseMessagingService {
  public FirebasePushNotification() {
    super();
  }

  @Override
  public void onMessageReceived(@NonNull RemoteMessage message) {
    super.onMessageReceived(message);
    Intent intentBackgroundService  = new Intent(this, FirebasePushNotification.class);
    startService(intentBackgroundService);
  }
}
