# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.react.devsupport.** { *; }
-dontwarn com.facebook.react.devsupport.**
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

-keep class com.facebook.react.bridge.CatalystInstanceImpl { *; }
-keep class com.facebook.react.bridge.JavaScriptExecutor { *; }
-keep class com.facebook.react.bridge.queue.NativeRunnable { *; }
-keep class com.facebook.react.bridge.ReadableType { *; }

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }