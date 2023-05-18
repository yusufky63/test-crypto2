export function Auth2FAStep1() {
  return (
    <div className=" max-w-6xl mt-8 text-sm lg:text-base">
      <h2 className="text-lg font-bold mb-2">Adım 1: Uygulama Kurulumu</h2>
      <p className="text-gray-600 text-center mb-8">
        Hesabınızın güvenliği için 2 adımlı doğrulama öneriyoruz. Bunu yapmak
        için bir kimlik doğrulama uygulaması kullanabilirsiniz. İşte size
        önerdiğimiz uygulamalar:
      </p>
      <div className="flex justify-between  md:flex-row flex-col  items-center ">
        <div className=" bg-white rounded-lg shadow-lg  w-44 p-2 m-5">
          <div className="flex justify-center">
             
            <img
              src="https://play-lh.googleusercontent.com/oMv9o-L-mNKdyL3Hp6fvNwrhAyIYB1iP3p644hxN03oFU0R2oevnmxmCLF6FewjzZXU=w240-h480-rw"
              alt="Google Logo"
              className="w-16 rounded-lg mb-4"
            />
          </div>
          <h2 className="text-lg font-bold mb-2">Google Kimlik Doğrulayıcı</h2>
          <p className="text-gray-600 mb-4">
            En popüler kimlik doğrulama uygulaması. Hem Android hem de iOS için
            kullanılabilir.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Play Store'dan İndirin
          </a>
          <br />
          <a
            href="https://apps.apple.com/us/app/google-authenticator/id388497605"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            App Store'dan İndirin
          </a>
        </div>
        <div className="bg-white rounded-lg text-sm lg:text-base shadow-lg w-44 p-2  m-5">
          <div className="flex justify-center">
            <img
              src="https://play-lh.googleusercontent.com/_1CV99jklLbXuun-6E7eCPR-sKKeZc602rhw_QHZz-qm7xrPdgWsJVc7NtFkkliI8No=w240-h480-rw"
              alt="Microsoft Logo"
              className="w-16 rounded-lg mb-4"
            />
          </div>
          <h2 className="text-lg font-bold mb-2">
            Microsoft Kimlik Doğrulayıcı
          </h2>
          <p className="text-gray-600 mb-4">
            Microsoft hesapları için kimlik doğrulama uygulaması. Hem Android
            hem de iOS için kullanılabilir.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_US&gl=US"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Play Store'dan İndirin
          </a>
          <br />
          <a
            href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            App Store'dan İndirin
          </a>
        </div>
        <div className="bg-white rounded-lg text-sm lg:text-base shadow-lg w-44 p-2  m-5 ">
          <div className="flex justify-center">
            <img
              src="https://play-lh.googleusercontent.com/F2wwwaQwutP2MvUJbjRm9knqRlUxSVghbPncqLr2IHvkyMvPlxjphiwC3Fhr9tOL60lP=w240-h480-rw"
              alt="2FAS Logo"
              className="w-16 rounded-lg mb-4"
            />
          </div>
          <h2 className="text-lg font-bold mb-2">2FAS Authenticator</h2>
          <p className="text-gray-600 mb-4">
            2FAS, kimliğinizi doğrulamak için iki faktörlü kimlik doğrulamayı
            etkinleştirmenin en kolay yoludur
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.twofasapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Play Store'dan İndirin
          </a>
          <br />
          <a
            href="https://apps.apple.com/us/app/2fa-authenticator-2fas/id1217793794"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            App Store'dan İndirin
          </a>
        </div>
      </div>
    </div>
  );
}