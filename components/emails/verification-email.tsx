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

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
}

const VerificationEmail = ({
  userName,
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html lang="fa" dir="rtl">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                تایید آدرس ایمیل
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                سلام {userName}،
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                از ثبت‌نام شما متشکریم! برای تکمیل حساب کاربری خود و شروع استفاده
                از خدمات ما، لطفاً آدرس ایمیل خود را با کلیک روی دکمه زیر تأیید کنید.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                این لینک تأیید برای امنیت تنها ۲۴ ساعت معتبر است.
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700"
              >
                تأیید آدرس ایمیل
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                اگر دکمه کار نکرد، می‌توانید این لینک را در مرورگر خود کپی و جای‌گذاری کنید:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {verificationUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                <strong>توجه امنیتی:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                اگر شما حساب کاربری ایجاد نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید.
                بدون تأیید ایمیل شما، آدرس شما به سیستم ما اضافه نخواهد شد.
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

export default VerificationEmail;
