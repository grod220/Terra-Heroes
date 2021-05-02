import { heroes } from '../data/heroes';
import { useState } from 'react';

export const Heroes = () => {
  const [cardIdHovered, setCardIdHovered] = useState(0);
  return (
    <div className="grid">
      {heroes.map((hero) => (
        <div
          className="card-wrapper"
          onMouseEnter={() => setCardIdHovered(hero.id)}
          onMouseLeave={() => setCardIdHovered(0)}
          onClick={() => alert('o')}
        >
          {
            <div className="card-overlay" style={{ opacity: cardIdHovered === hero.id ? 1 : 0 }}>
              Book a visit
            </div>
          }
          <div
            className="card-content"
            style={{
              background: `url(${hero.thumbnail}) no-repeat center center`,
              backgroundSize: 'cover',
              opacity: cardIdHovered === hero.id ? 0.5 : 1,
            }}
          >
            <h3>{hero.name}</h3>
            <h4>${hero.price}</h4>
          </div>
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

        .card-wrapper {
          position: relative;
        }

        .card-overlay {
          position: absolute;
          z-index: 1000;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 30px;
          transition: all 300ms;
          opacity: 1;
          cursor: pointer;
        }

        .card-content {
          height: 400px;
          transition: all 300ms;
          opacity: 1;
        }

        .card-content:hover {
          cursor: pointer;
        }

        h3 {
          font-size: 60px;
          mix-blend-mode: color-burn;
          color: #d5acac;
          margin-top: 0;
        }

        h4 {
          font-size: 30px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};
