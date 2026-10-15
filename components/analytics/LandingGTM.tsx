/* eslint-disable @next/next/next-script-for-ga */
/**
 * LandingGTM — Google Tag Manager container specifically for the Free Air Audit
 * landing page and conversion funnel (/airaudit and /thankyou).
 *
 * Container ID: GTM-5FPLF3W6
 */
export function LandingGTM() {
  return (
    <>
      {/* 1. Google Tag Manager script as high in <head> as possible */}
      <script
        id="gtm-landing-script"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5FPLF3W6');`,
        }}
      />
      {/* 2. Google Tag Manager (noscript) immediately after opening <body> */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5FPLF3W6"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
