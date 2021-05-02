import { heroes } from '../data/heroes';

export const Heroes = () => {
  return (
    <div className="grid">
      {heroes.map((hero) => (
        <div
          className="card"
          style={{ background: `url(${hero.thumbnail}) no-repeat center center`, backgroundSize: 'cover' }}
        >
          <h3>{hero.name}</h3>
          <h4>${hero.price}</h4>
        </div>
      ))}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 50px;
          margin: 50px 0;
          color: white;
        }

        .card {
          height: 400px;
        }

        h3 {
          font-size: 60px;
          mix-blend-mode: color-burn;
          color: #d5acac;
        }

        h4 {
          font-size: 30px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};
