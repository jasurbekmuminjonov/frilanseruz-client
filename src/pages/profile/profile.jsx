import React, { useEffect, useState } from "react";
import "../edit/edit.css";
import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetByUsernameQuery,
  useGetUserQuery,
} from "../../context/services/user.service";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiGlobe, CiUser } from "react-icons/ci";
import ReactMarkdown from "react-markdown";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaRegHourglass,
  FaTwitter,
  FaVk,
  FaYoutube,
} from "react-icons/fa6";
import logo from "/logo.png";
import { FaTelegramPlane } from "react-icons/fa";
import { IoEye, IoGlobeOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { MdEdit } from "react-icons/md";
import { Modal } from "antd";
const Profile = () => {
  const { id } = useParams();
  const token = Cookies.get("access_token");
  const { data: userData = {} } = useGetByUsernameQuery(id);
  const { data: userNameUser = {} } = token ? useGetUserQuery() : { data: {} };
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (userData?.username === userNameUser.username) {
      setIsOwner(true);
    }
  }, [userData, userNameUser]);

  const countryData = [
    { name: "Россия", flag: "🇷🇺", id: "ru" },
    { name: "Узбекистан", flag: "🇺🇿", id: "uz" },
    { name: "Казахстан", flag: "🇰🇿", id: "kz" },
  ];

  const jobData = [
    { value: "mobile_dev", label: "Мобильный разработчик" },
    { value: "frontend_dev", label: "Фронтенд-разработчик" },
    { value: "backend_dev", label: "Бэкэнд-разработчик" },
    { value: "fullstack_dev", label: "Фуллстек-разработчик" },
    { value: "game_dev", label: "Разработчик игр" },
    { value: "devops_dev", label: "DevOps-инженер" },
    { value: "data_dev", label: "Инженер данных" },
    { value: "iiml_dev", label: "Разработчик ИИ/МО" },
    { value: "blockchain_dev", label: "Блокчейн-разработчик" },
    { value: "embedded_dev", label: "Разработчик встраиваемых систем" },
    { value: "security_dev", label: "Специалист по кибербезопасности" },
    { value: "arvr_dev", label: "Разработчик AR/VR" },
    { value: "graphic_design", label: "Графический дизайнер" },
    { value: "uxui_design", label: "UI/UX дизайнер" },
    { value: "web_design", label: "Веб-дизайнер" },
    { value: "mobile_design", label: "Дизайнер мобильных приложений" },
    { value: "game_design", label: "Геймдизайнер" },
    { value: "interior_design", label: "Дизайнер интерьеров" },
    { value: "motion_design", label: "Моушн-дизайнер" },
    { value: "brand_design", label: "Бренд-дизайнер" },
    { value: "3d_design", label: "3D дизайнер" },
    { value: "fashion_design", label: "Модельер" },
    { value: "illustration_design", label: "Дизайнер иллюстраций" },
    { value: "content_writer", label: "Контент-писатель" },
    { value: "seo_writer", label: "SEO-создатель" },
    { value: "copy_writer", label: "Копирайтер" },
    { value: "video_content_writer", label: "Сценарист видеоконтента" },
    {
      value: "graphic_content_writer",
      label: "Сценарист графического контента",
    },
    { value: "photo_video_writer", label: "Фотограф/Видеооператор" },
    { value: "social_writer", label: "Менеджер социальных сетей" },
    { value: "report_writer", label: "Журналист" },
    { value: "frontend_tester", label: "Фронтенд-тестер" },
    { value: "backend_tester", label: "Бэкэнд-тестер" },
    { value: "performance_tester", label: "Тестер производительности" },
    { value: "security_tester", label: "Тестер безопасности" },
    { value: "qa_tester", label: "Инженер по обеспечению качества" },
    { value: "game_tester", label: "Тестер игр" },
  ];
  const levels = {
    junior: "Junior",
    middle: "Middle",
    senior: "Senior",
    lead: "Lead",
  };
  const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    facebook: <FaFacebook />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    telegram: <FaTelegramPlane />,
    vk: <FaVk />,
    website: <IoGlobeOutline />,
    dribbble: <FaDribbble />,
  };
  return (
    <div className="profile">
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onClose={() => setShowModal(false)}
        footer={[]}
        style={{ display: "flex", flexDirection: "column", gap: "6px" }}
      >
        <p style={{ fontSize: "25px", fontWeight: "500" }}>
          {modalContent.title}
        </p>
        <span>{modalContent.description}</span>
        <img
          style={{ width: "100%", border: "1px solid #ccc" }}
          src={modalContent.image}
          alt=""
        />
        <a target="_blank" href={modalContent.link}>
          Ссылкa
        </a>
      </Modal>
      <div className="profile_data">
        <div className="logo">
          <img src={logo} alt="logo" />
          <a href="https://frilanser.uz">frilanser.uz</a>
        </div>
        <div className="profile_image">
          <img src={userData?.profile_photo} alt="profile" />
        </div>
        <p>{userData?.fullname} </p>
        {isOwner && (
          <button onClick={() => navigate("/edit")}>
            <MdEdit />
            Редактировать
          </button>
        )}
        <div className="user_info">
          <p>
            <IoIosInformationCircleOutline />
            {levels[userData.experience_level]}{" "}
            {userData.job_type !== "other"
              ? jobData?.find((item) => item?.value === userData?.job)?.label
              : userData?.job}
          </p>
          <p>
            <CiGlobe />
            {countryData?.find((item) => item?.id === userData?.country)?.name}
          </p>
          <p>
            <CiUser />
            {`${userData.age} лет`}
          </p>
          <p>
            <FaRegHourglass />
            {`Опыт ${userData.experience_years} год`}
          </p>
        </div>
        <div className="socials">
          {userData?.social_media?.map((item) => (
            <a key={item._id} target="_blank" href={item.link}>
              {socialIcons[item.platform]}
            </a>
          ))}
        </div>
        <div className="skills">
          {userData?.skills?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="about">
          <p>Обо мне</p>
          {/* <span style={{ whiteSpace: "pre-line" }}>{userData?.about}</span> */}
          <span>
            <ReactMarkdown children={userData?.about} />
          </span>
          <p>{userData.email}</p>
        </div>
      </div>
      <div className="portfolio_body">
        {userData?.portfolio?.length < 1 ? (
          <div className="add_more">
            <p>Портфолио пусто</p>
          </div>
        ) : (
          userData?.portfolio?.map((item) => (
            <div
              className="portfolio_card"
              style={{ backgroundImage: `url(${item.image})` }}
              key={item._id}
            >
              <div className="card_actions">
                <p>{item.title}</p>
                <div className="action_buttons">
                  <button
                    onClick={() => {
                      setModalContent(item);
                      setShowModal(true);
                    }}
                  >
                    <IoEye />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
