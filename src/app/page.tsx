const HomePage = () => {
  return (
    <>
      <head>
        <title>Clone API</title>
        <meta name="description" content="This is my awesome Next.js site!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <h1>
          Salom, bu API adminlar uchun. Oddiy foydalanuvchida baribir
          ishlamaydi, chiqib ketaqoling.
        </h1>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <a href="https://test-auth-api.vercel.app/api/users">
            Foydalanuvchilar ro&apos;yxati
          </a>
          <a href="https://test-auth-api.vercel.app/api/register">
            Registratsiya
          </a>
          <a href="https://test-auth-api.vercel.app/api/login">
            Akkountga kirish {"(token qaytaradi)"}
          </a>
        </div>
        <div style={{ background: "black", color: "white", padding: "10px 20px" }}>
          <pre>
            <code>
              {`Registratsiya: {
  "name": "string",
  "password": "string",
  "fullInfo": "object"
}. Name ishlatilmagan bo&apos;lishi kerak.`}
            </code>
          </pre>

          <pre>
            <code>
              {`Login: {
  "name": "string",
  "password": "string"
}, lekin password va name to&apos;g'ri bo'lishi shart.`}
            </code>
          </pre>
        </div>
      </body>
    </>
  );
};

export default HomePage;
