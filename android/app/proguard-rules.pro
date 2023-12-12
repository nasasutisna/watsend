# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

-ignorewarnings
-keep class com.watsend.app.BuildConfig { *; }
-assumenosideeffects class android.util.Log {
  public static boolean isLoggable(java.lang.String, int);
  public static *** v(...);
  public static *** d(...);
  public static *** i(...);
  public static *** w(...);
  public static *** e(...);
}
-keep class com.google.android.material.** { *; }
-dontwarn com.google.android.material.**
-dontnote com.google.android.material.**
-dontwarn androidx.**
-keep class androidx.** { *; }
-keep interface androidx.** { *; }
-keep class org.apache.http.* { *; }
-keep class org.apache.http.client.** { *; }
-keep class org.apache.http.cookie.** { *; }
-keep class org.apache.http.impl.cookie.** { *; }
-keep class org.apache.http.message.** { *; }
-keep class org.apache.http.util.** { *; }
-keep class org.apache.http.** { *; }
-keep class com.ionicframework.cordova.webview.** { *; } 
-keep class com.ionicframework.cordova.webview.*

-dontwarn com.google.android.gms.**

-keep public class * extends org.apache.cordova.CordovaPlugin

-keep class org.apache.cordova.** { *; }

-keep class io.** { *; }
-keep public class * extends org.apache.cordova.CordovaPlugin
-keep public class * extends com.getcapacitor.Plugin
-keep @com.getcapacitor.annotation.CapacitorPlugin public class * {
    @com.getcapacitor.annotation.PermissionCallback <methods>;
    @com.getcapacitor.annotation.ActivityCallback <methods>;
    @com.getcapacitor.PluginMethod public <methods>;
}

-mergeinterfacesaggressively
-overloadaggressively
-repackageclasses 'com.watsend.app'