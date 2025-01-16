import React, { useState, useEffect, useRef } from "react";
import "./edit.css";
import { useForm, Controller } from "react-hook-form";
import {
  MdDelete,
  MdDeleteForever,
  MdEdit,
  MdOutlineAddAPhoto,
  MdOutlineFileUpload,
} from "react-icons/md";
import { FaX } from "react-icons/fa6";
import { message } from "antd";
import {
  useAddItemToPortfolioMutation,
  useGetUserQuery,
  useRemoveItemFromPortfolioMutation,
  useSetUserDataMutation,
  useUpdatePortfolioItemMutation,
} from "../../context/services/user.service";
import { FaTelegramPlane } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import { Modal } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaVk,
  FaYoutube,
} from "react-icons/fa6";
const Edit = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job_type: "development",
      skills: [],
    },
  });
  const [addItemToPortfolio] = useAddItemToPortfolioMutation();
  const navigate = useNavigate();
  const [removeItemFromPortfolio] = useRemoveItemFromPortfolioMutation();
  const [updateItemFromPortfolio] = useUpdatePortfolioItemMutation();
  const {
    control: portfolioControl,
    handleSubmit: portfolioHandleSubmit,
    register: portfolioRegister,
    watch: portfolioWatch,
    reset: portfolioReset,
  } = useForm();
  const token = Cookies.get("access_token");
  if (!token) {
    window.location.href = "/";
  }
  const { data: userData = [] } = useGetUserQuery();
  const [socialModal, setSocialModal] = useState(false);
  const [socialData, setSocialData] = useState([]);
  const [newSocial, setNewSocial] = useState({
    platform: "",
    link: "",
  });
  const [open, setOpen] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [setUserData] = useSetUserDataMutation();
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef = useRef(null);
  const portfolioInputRef = useRef(null);
  const [jobOptions, setJobOptions] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [portfolioImage, setPortfolioImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const jobType = watch("job_type");

  const countryData = [
    { name: "Россия", flag: "🇷🇺", id: "ru" },
    { name: "Узбекистан", flag: "🇺🇿", id: "uz" },
    { name: "Казахстан", flag: "🇰🇿", id: "kz" },
  ];

  const jobData = {
    development: [
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
    ],
    design: [
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
    ],
    content: [
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
    ],
    testing: [
      { value: "frontend_tester", label: "Фронтенд-тестер" },
      { value: "backend_tester", label: "Бэкэнд-тестер" },
      { value: "performance_tester", label: "Тестер производительности" },
      { value: "security_tester", label: "Тестер безопасности" },
      { value: "qa_tester", label: "Инженер по обеспечению качества" },
      { value: "game_tester", label: "Тестер игр" },
    ],
    other: [],
  };

  useEffect(() => {
    if (userData) {
      reset({
        fullname: userData.fullname || "",
        age: userData.age || "",
        country: userData.country || "",
        job_type: userData.job_type || "development",
        job: userData.job || "",
        experience_years: userData.experience_years || "",
        experience_level: userData.experience_level || "junior",
        username: userData.username || "",
        about: userData.about || "",
        skills: userData.skills || [],
      });
      setProfileImage(userData.profile_photo || null);
      setSkills(userData.skills || []);
      setSocialData(userData.social_media || []);
    }
  }, [userData, reset]);

  useEffect(() => {
    if (jobType) {
      setJobOptions(jobData[jobType] || []);
    }
  }, [jobType]);

  const handleSkillChange = (e) => {
    const newSkill = e.target.value.trim();
    if (newSkill && !skills.includes(newSkill) && skills.length < 5) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      e.target.value = "";
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSkillChange(e);
    }
  };

  const handleSkillDelete = (skill) => {
    setSkills((prevSkills) => prevSkills.filter((item) => item !== skill));
  };

  const onSubmit = (data) => {
    if (
      !profileImage ||
      !data.fullname ||
      !data.age ||
      !data.country ||
      !data.job_type ||
      !data.job ||
      !data.experience_years ||
      !data.experience_level ||
      !data.username ||
      !data.about ||
      skills.length === 0
    ) {
      messageApi.open({
        type: "error",
        content: "Заполните все поля",
      });
      return;
    }
    data.profile_photo = profileImage;
    data.skills = skills;
    data.age = Number(data.age);
    data.experience_years = Number(data.experience_years);
    data.social_media = socialData;

    setUserData(data)
      .then((response) => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
        navigate(`/${data.username}`);
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Произошла ошибка",
        });
      });
  };
  const onSubmitModal = (data) => {
    if (!portfolioImage || !data.title || !data.description || !data.link) {
      messageApi.open({
        type: "error",
        content: "Заполните все поля",
      });
      return;
    }
    data.image = portfolioImage;

    if (updatingProjectId) {
      updateItemFromPortfolio({ item_id: updatingProjectId, body: data })
        .then((response) => {
          messageApi.open({
            type: "success",
            content: response.data.message,
          });
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error.message || "Ошибка при обновлении проекта",
          });
        });
    } else {
      addItemToPortfolio(data)
        .then((response) => {
          messageApi.open({
            type: "success",
            content: response.data.message,
          });
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error.message || "Ошибка при добавлении проекта",
          });
        });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1500000) {
        messageApi.open({
          type: "error",
          content: "Максимальный размер файла 1.5 MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePortfolioImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2500000) {
        messageApi.open({
          type: "error",
          content: "Максимальный размер файла 2.5 MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPortfolioImage(reader.result);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
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
    dribbble: <FaDribbble />,
    website: <IoGlobeOutline />,
  };

  function handleSocialSubmit() {
    const body = {
      platform: newSocial.platform,
      link: newSocial.link,
    };
    if (newSocial._id) {
      setSocialData((prevItems) =>
        prevItems.map((item) => (item._id === newSocial._id ? body : item))
      );
    } else {
      setSocialData([...socialData, body]);
    }
    setNewSocial({
      platform: "",
      link: "",
    });
    setSocialModal(false);
  }
  return (
    <div className="profile">
      {contextHolder}
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="profile_data"
        style={collapsed ? { display: "none" } : { display: "flex" }}
      >
        <Modal
          open={socialModal}
          onCancel={() => {
            setSocialModal(false),
              setNewSocial({
                platform: "",
                link: "",
              });
          }}
          footer={[]}
          title="Социальные сети"
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <label htmlFor="platform">
              <select
                required
                onChange={(e) =>
                  setNewSocial({
                    ...newSocial,
                    platform: e.target.value,
                  })
                }
                id="platform"
                value={newSocial.platform}
              >
                <option disabled value="">
                  Выберите социальную сеть
                </option>
                {Object.keys(socialIcons).map((key) => (
                  <option value={key} key={key}>
                    {key === "website"
                      ? "Персональный сайт или другой"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="link">
              <input
                value={newSocial.link}
                required
                onChange={(e) =>
                  setNewSocial({
                    ...newSocial,
                    link: e.target.value,
                  })
                }
                type="url"
                placeholder="Ссылкa"
              />
            </label>
            <p>
              <b>Примечание:</b> После добавления учетной записи социальной сети
              не забудьте нажать кнопку 'Отправить'
            </p>

            <button type="button" onClick={() => handleSocialSubmit()}>
              {newSocial._id ? "Обновить" : "Добавить"}
            </button>
          </form>
        </Modal>
        <p>Редактировать аккаунт</p>
        <div
          onClick={() =>
            profileImage ? setProfileImage(null) : fileInputRef.current.click()
          }
          className="profile-image"
        >
          {profileImage ? (
            <>
              <MdDeleteForever color="red" />
              <p style={{ color: "red" }}>Очистить</p>
            </>
          ) : (
            <>
              <MdOutlineAddAPhoto />
              <p>Изображение профиля</p>
              <input
                onChange={handleImageChange}
                ref={fileInputRef}
                type="file"
                accept="image/*"
              />
            </>
          )}
        </div>
        {profileImage && <img src={profileImage} alt="profile image" />}
        <label htmlFor="fullname">
          <p>Полное имя</p>
          <input type="text" {...register("fullname")} />
        </label>
        <label htmlFor="username">
          <p>Имя пользователя</p>
          <input
            type="text"
            {...register("username", {
              required: "Заполните поле username",
              pattern: {
                value: /^[a-z0-9_]+$/,
                message:
                  "Разрешены только строчные буквы, цифры и подчеркивания",
              },
            })}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </label>
        <label htmlFor="about">
          <p>О себе</p>
          <textarea {...register("about")} />
        </label>
        <label htmlFor="age">
          <p>Возраст</p>
          <input type="number" {...register("age")} />
        </label>
        <label htmlFor="country">
          <p>Страна</p>
          <select {...register("country")}>
            {countryData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.flag} {item.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="job_type">
          <p>Сфера деятельности</p>
          <select {...register("job_type")}>
            <option value="development">Разработка</option>
            <option value="design">Дизайн</option>
            <option value="content">Контент</option>
            <option value="testing">Тестирование</option>
            <option value="other">Другой</option>
          </select>
        </label>
        <label htmlFor="job">
          <p>Работа</p>
          {jobType !== "other" ? (
            <Controller
              name="job"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {jobOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
          ) : (
            <input
              type="text"
              placeholder="Введите вручную"
              {...register("job")}
            />
          )}
        </label>
        <label htmlFor="experience_years">
          <p>Опыт работы (лет)</p>
          <input type="number" {...register("experience_years")} />
        </label>
        <label htmlFor="experience_level">
          <p>Уровень опыта</p>
          <select {...register("experience_level")}>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </label>

        <label htmlFor="skills">
          <p>Навыки (макс. 5)</p>
          <input
            type="text"
            disabled={skills.length >= 5}
            onKeyDown={handleKeyDown}
          />
          <div className="skills">
            {skills.map((skill, index) => (
              <span key={index}>
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillDelete(skill)}
                  className="delete-button"
                >
                  <FaX />
                </button>
              </span>
            ))}
          </div>
        </label>
        <label htmlFor="social_media" className="social_media">
          {socialData.length < 1 && <p>Никаких социальных сетей</p>}
          {socialData.map((item) => (
            <div className="social">
              <a href={item.link}>
                {socialIcons[item.platform]}{" "}
                {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
              </a>
              <div className="social_actions">
                <button
                  onClick={() => {
                    setNewSocial(item), setSocialModal(true);
                  }}
                  type="button"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Вы уверены, что хотите удалить его?")) {
                      setSocialData(
                        socialData.filter((i) => i._id !== item._id)
                      );
                    } else {
                      return;
                    }
                  }}
                  type="button"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
          {socialData.length < 6 ? (
            <button onClick={() => setSocialModal(true)} type="button">
              Добавить
            </button>
          ) : (
            {}
          )}
        </label>
        <button type="submit">Oтправить</button>
      </form>

      <div className="portfolio_body">
        <Modal
          title="Добавить проект"
          open={open}
          onOk={() => {}}
          confirmLoading={confirmLoading}
          onCancel={() => {
            setOpen(false);
            portfolioReset({
              title: "",
              description: "",
              link: "",
            });
            setPortfolioImage(null);
          }}
          centered
          footer={[]}
        >
          <form onSubmit={portfolioHandleSubmit(onSubmitModal)}>
            <label htmlFor="title">
              <p>Название проекта</p>
              <input {...portfolioRegister("title")} type="text" />
            </label>
            <label htmlFor="description">
              <p>Описание</p>
              <textarea {...portfolioRegister("description")} type="text" />
            </label>
            <label htmlFor="link">
              <p>Ссылка</p>
              <input {...portfolioRegister("link")} type="url" />
            </label>
            <label htmlFor="image">
              <p>Изображение</p>
              <div
                onClick={() =>
                  portfolioImage
                    ? setPortfolioImage(null)
                    : portfolioInputRef.current.click()
                }
                className="portfolio-image"
              >
                {portfolioImage ? (
                  <>
                    <MdDeleteForever color="red" />
                    <p style={{ color: "red" }}>Очистить</p>
                  </>
                ) : (
                  <>
                    <MdOutlineFileUpload />
                    <p>Загрузить изображение</p>
                  </>
                )}

                <input
                  onChange={handlePortfolioImageChange}
                  ref={portfolioInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </label>
            {portfolioImage && (
              <img src={portfolioImage} alt="portfolio image" />
            )}
            <button
              style={{
                background: "#0058ff",
                color: "#fff",
                width: "100%",
                height: "40px",
                borderRadius: "30px",
                marginTop: "10px",
              }}
              type="submit"
            >
              Oтправить
            </button>
          </form>
        </Modal>

        {userData?.portfolio?.map((item) => (
          <div
            key={item._id}
            style={{ backgroundImage: `url(${item.image})` }}
            className="portfolio_card"
          >
            <div className="card_actions">
              <p>{item.title}</p>
              <div className="action_buttons">
                <button
                  onClick={() => {
                    portfolioReset({
                      title: item.title,
                      description: item.description,
                      link: item.link,
                    });
                    setPortfolioImage(item.image);
                    setUpdatingProjectId(item._id);
                    setOpen(true);
                  }}
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Вы уверены, что хотите удалить этот проект? Вернуть его невозможно"
                      )
                    ) {
                      removeItemFromPortfolio(item._id);
                    } else {
                      return;
                    }
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="add_more" onClick={() => setOpen(true)}>
          <p>+ Добавить проект</p>
        </div>
      </div>
    </div>
  );
};

export default Edit;
