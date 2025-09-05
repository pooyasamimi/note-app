import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
  requestTime: string;
}

const PasswordResetEmail = ({
  userName,
  resetUrl,
  requestTime,
}: PasswordResetEmailProps) => {
  return (
    <Html lang="fa" dir="rtl">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                بازنشانی رمز عبور
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                سلام {userName}،
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                ما درخواست بازنشانی رمز عبور شما را در {requestTime} دریافت کردیم. اگر شما این
                درخواست را انجام داده‌اید، روی دکمه زیر کلیک کنید تا رمز عبور جدید ایجاد شود.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                این لینک بازنشانی رمز عبور برای امنیت تنها ۱ ساعت معتبر است.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-red-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border hover:bg-red-700"
              >
                بازنشانی رمز عبور
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                اگر دکمه کار نکرد، می‌توانید این لینک را در مرورگر خود کپی و جای‌گذاری کنید:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {resetUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                <strong>توجه امنیتی:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                • اگر شما درخواست بازنشانی رمز عبور نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید.
                رمز عبور شما بدون تغییر باقی می‌ماند.
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                • برای امنیت شما، این لینک تنها یکبار قابل استفاده است و پس از ۱ ساعت منقضی می‌شود.
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                • اگر همچنان این ایمیل‌ها را دریافت می‌کنید، لطفاً فوراً با تیم پشتیبانی ما تماس بگیرید.
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="bg-gray-50 p-[20px] rounded-[6px] mb-[24px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] mb-[8px] font-semibold">
                نیاز به کمک دارید؟
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                اگر در بازنشانی رمز عبور با مشکل مواجه شدید، لطفاً با تیم پشتیبانی ما در
                support@yourcompany.com تماس بگیرید یا به مرکز راهنمایی ما مراجعه کنید.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                این ایمیل توسط شرکت شما ارسال شده است
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                123 خیابان کسب‌وکار، سوئیت 100، شهر، استان 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © {new Date().getFullYear()} شرکت شما. تمامی حقوق محفوظ است.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>

  );
};

export default PasswordResetEmail;
