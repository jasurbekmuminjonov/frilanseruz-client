import React, { useEffect, useState } from "react";
import freelancerImg from "../../assets/freelanser.png";
import google from "../../assets/google.png";
import "./hero.css";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useSignUpMutation } from "../../context/services/auth.service";
import Cookies from "js-cookie";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../context/services/user.service";

const Hero = () => {
  const [signUp] = useSignUpMutation();
  const token = Cookies.get("access_token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { data = [] } = token ? useGetUserQuery() : { data: [] };
  useEffect(() => {
    if (token) {
      setUserData(data);
    }
  }, [data]);
  const clientId =
    "35348802662-u7fqijival00o13duc606v1qcr0b8quo.apps.googleusercontent.com";

  const buttonStyle = {
    height: "40px",
    width: "200px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    justifyContent: "center",
    fontWeight: "600",
  };

  const onSuccess = (res) => {
    signUp({ email: res.profileObj.email })
      .then((response) => {
        Cookies.set("access_token", response.data.token);
        if (response.data.username) {
          window.location.href = `/${response.data.username}`;
        } else {
          window.location.href = "/edit";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFailure = (res) => {
    console.log("Google login failed: ", res);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
        {token ? (
          <button
            onClick={() =>
              navigate(
                userData.fullname !== "" ? `/${userData.username}` : "/edit"
              )
            }
          >
            <MdLogin />
            Аккаунт
          </button>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Продолжить с Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            render={(renderProps) => (
              <button
                onClick={() => {
                  renderProps.onClick();
                  handleSubmit();
                }}
                disabled={renderProps.disabled}
                style={buttonStyle}
              >
                <img style={{ width: "20px" }} src={google} alt="google" />
                Продолжить с Google
              </button>
            )}
          />
        )}
      </div>
      <img src={freelancerImg} alt="freelanser" />
    </div>
  );
};

export default Hero;
