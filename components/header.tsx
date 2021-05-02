export const Header = () => {
  return (
    <>
      <h1 className="highlight">Terra X-Men</h1>
      <h2>
        With global crime rates hitting an all-time low, the X-Men are a bit strapped for cash.
        <br />
        Now with <span className="highlight">Terra UST</span>, you can easily book them for a party, arm wrestle, or
        whatever you'd like---they are broke.
        <br />
        Pay and instantly they'll be on their way.
      </h2>
      <style jsx>{`
        h1 {
          font-family: 'Monoton', cursive;
          font-size: 100px;
          text-align: center;
          margin-bottom: 10px;
        }

        .highlight {
          color: #d9b70a;
        }

        h2 {
          text-align: center;
          color: white;
        }
      `}</style>
    </>
  );
};
