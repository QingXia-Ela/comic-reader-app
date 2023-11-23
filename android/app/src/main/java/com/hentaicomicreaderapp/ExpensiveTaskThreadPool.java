package com.hentaicomicreaderapp;


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nonnull;

public class ExpensiveTaskThreadPool extends ReactContextBaseJavaModule {
    int coreNum = Runtime.getRuntime().availableProcessors();
    ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(coreNum - 1, coreNum - 1, 1, TimeUnit.MINUTES, new LinkedBlockingQueue());

    @Nonnull
    @Override
    public String getName() {
        return "ExpensiveTaskThreadPool";
    }

    @ReactMethod
    public void run(Callback task) {
        threadPoolExecutor.submit(() -> {
            try {
                Thread.sleep(Long.parseLong("5000"));
            } catch (InterruptedException e) {
                System.out.println(e.getMessage());
            }
            task.invoke();
        });
    }
}
