"use server";

import { auth } from "@/lib/auth";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, message: "ورود با موفقیت انجام شد" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "ورود موفقیت‌آمیز نبود" };
  }
};

export const signUpUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { success: true, message: "ثبت‌ نام با موفقیت انجام شد" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "ثبت‌ نام موفقیت‌آمیز نبود",
    };
  }
};
