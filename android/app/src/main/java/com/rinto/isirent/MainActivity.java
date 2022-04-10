package com.rinto.isirent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  @Override
  protected String getMainComponentName() {
    return "IsiRent";
  }
  
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }
  // public static class MainActivityDelegate extends ReactActivityDelegate {

  //   // …

  //   @Override
  //   protected void loadApp(String appKey) {
  //     RNBootSplash.init(getPlainActivity()); // <- initialize the splash screen
  //     super.loadApp(appKey);
  //   }
  // }
}
