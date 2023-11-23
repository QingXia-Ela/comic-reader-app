package com.hentaicomicreaderapp.Utils;

import com.facebook.react.bridge.ReactMethod;

public class Decrypt {
    public static byte[] xorDecrypt(byte[] arr, String key) {
        byte[] ret = new byte[arr.length];

        for (int i = 0; i < arr.length; i++) {
            ret[i] = (byte) (arr[i] ^ key.getBytes()[i % key.getBytes().length]);
        }

        return ret;
    }
}
