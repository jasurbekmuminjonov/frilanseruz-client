import React from "react";
import freelancerImg from "../../assets/freelanser.png";
import "./hero.css";
const Hero = () => {
  return (
    <div className="hero-section">
      <div className="left">
        <h3>
          Представляем <span>frilanser.uz</span>
        </h3>
        <h1>
          Идеальное место, чтобы продемонстрировать свою работу, найти клиентов
          и продемонстрировать свой опыт всему миру
        </h1>
        <p>
          Платформа портфолио для дизайнеров, разработчиков и других современных
          специалистов.
          <a href="/about" target="_blank">
            Узнайте больше о frilanser.uz
          </a>
        </p>
        <button>Зарегистрироваться</button>
      </div>
      <img src={freelancerImg} alt="freelanser" />
    </div>
  );
};

export default Hero;
