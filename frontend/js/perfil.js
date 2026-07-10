/**
 * Lógica del perfil del usuario (vista y edición de datos locales).
 */

// Inicialización de seguridad
(function checkAuth() {
  if (!localStorage.getItem("user_name")) {
    document.body.style.display = "none";
    window.location.replace("index.html");
  }
  window.addEventListener("pageshow", function (event) {
    if (!localStorage.getItem("user_name")) {
      document.body.style.display = "none";
      window.location.replace("index.html");
    }
  });
})();

// Inicialización principal
(function () {
  // Selectores del DOM
  const prevNameText = document.getElementById("prevName");
  const prevAgeText = document.getElementById("prevAge");
  const prevHometownText = document.getElementById("prevHometown");
  const prevBioHeader = document.getElementById("prevBioHeader");
  const prevBioDetail = document.getElementById("prevBioDetail");
  const prevAvatarImg = document.getElementById("prevAvatar");
  const prevStyleBadge = document.getElementById("prevStyleBadge");

  const prevDetailDest = document.getElementById("prevDetailDest");
  const prevDetailDates = document.getElementById("prevDetailDates");
  const prevDetailBudget = document.getElementById("prevDetailBudget");
  const prevDetailLanguages = document.getElementById("prevDetailLanguages");
  const prevInterestPills = document.getElementById("prevInterestPills");

  const sidebarAvatarImg = document.getElementById("sidebarAvatar");
  const sidebarNameText = document.getElementById("sidebarUserName");
  const sidebarProgress = document.getElementById("sidebarProgress");
  const sidebarProgressText = document.getElementById("sidebarProgressText");
  const previewPageProgress = document.getElementById("previewPageProgress");
  const previewPageProgressText = document.getElementById(
    "previewPageProgressText",
  );

  const modalProfileName = document.getElementById("modalProfileName");
  const modalProfileAge = document.getElementById("modalProfileAge");
  const modalProfileHometown = document.getElementById("modalProfileHometown");
  const modalProfileBio = document.getElementById("modalProfileBio");
  const modalProfileLanguages = document.getElementById(
    "modalProfileLanguages",
  );
  const modalProfileInterests = document.getElementById(
    "modalProfileInterests",
  );
  const btnSaveProfileInfo = document.getElementById("btnSaveProfileInfo");

  const modalTripDestination = document.getElementById("modalTripDestination");
  const modalTripStartDate = document.getElementById("modalTripStartDate");
  const modalTripEndDate = document.getElementById("modalTripEndDate");
  const btnSaveTripDetails = document.getElementById("btnSaveTripDetails");

  const btnSaveTestProfile = document.getElementById("btnSaveTestProfile");

  const toastEl = document.getElementById("saveSuccessToast");
  const toastInstance = toastEl
    ? new bootstrap.Toast(toastEl, { delay: 3000 })
    : null;

  // Estado
  let userName = localStorage.getItem("user_name") || "";
  let userAge = localStorage.getItem("user_age") || "";
  let userHometown =
    localStorage.getItem("user_hometown") || "";
  let userBio =
    localStorage.getItem("user_bio") ||
    "";
  let userAvatar =
    localStorage.getItem("user_avatar") || "https://i.pravatar.cc/150?img=12";

  let userDestination =
    localStorage.getItem("user_destination") || "";
  let userStartDate = localStorage.getItem("user_start_date") || "";
  let userEndDate = localStorage.getItem("user_end_date") || "";
  let userInterests =
    localStorage.getItem("user_interests") ||
    "";
  let userLanguages =
    localStorage.getItem("user_languages") || "";

  // Configuración
  const iconMap = [
    {
      keywords: [
        "trekking",
        "senderismo",
        "hiking",
        "montaña",
        "naturaleza",
        "nature",
        "camping",
        "bosque",
        "outdoor",
      ],
      icon: "bi-tree-fill",
    },
    {
      keywords: [
        "fotografia",
        "photography",
        "fotos",
        "foto",
        "camera",
        "camara",
      ],
      icon: "bi-camera-fill",
    },
    {
      keywords: [
        "comida",
        "gastronomia",
        "food",
        "restaurant",
        "cocina",
        "comer",
        "culinario",
        "chef",
      ],
      icon: "bi-egg-fried",
    },
    {
      keywords: ["cafe", "coffee", "mate", "te", "barista"],
      icon: "bi-cup-hot-fill",
    },
    {
      keywords: [
        "musica",
        "music",
        "conciertos",
        "bandas",
        "cantar",
        "guitarra",
      ],
      icon: "bi-music-note-beamed",
    },
    {
      keywords: ["libros", "lectura", "leer", "books", "novelas", "escritura"],
      icon: "bi-book-fill",
    },
    {
      keywords: ["playa", "beach", "mar", "sea", "sol", "arena", "verano"],
      icon: "bi-sun-fill",
    },
    {
      keywords: ["historia", "cultura", "museos", "art", "arte", "galeria"],
      icon: "bi-bank",
    },
    {
      keywords: ["idiomas", "lenguas", "languages", "ingles", "hablar"],
      icon: "bi-translate",
    },
    {
      keywords: [
        "deportes",
        "sport",
        "futbol",
        "running",
        "gimnasio",
        "gym",
        "bici",
        "ciclismo",
      ],
      icon: "bi-activity",
    },
    {
      keywords: [
        "fiesta",
        "party",
        "cerveza",
        "beer",
        "tragos",
        "bar",
        "boliche",
        "club",
        "baile",
        "bailar",
      ],
      icon: "bi-glass-cocktail",
    },
    { keywords: ["cine", "peliculas", "movies", "teatro"], icon: "bi-film" },
    {
      keywords: ["viajar", "viajes", "travel", "avión", "mochila", "aventura"],
      icon: "bi-compass-fill",
    },
  ];

  const travelStyleMap = {
    mochilero: { text: "Mochilero", percent: 90 },
    hotel: { text: "Lujo / Confort", percent: 30 },
    organizado: { text: "Planificado", percent: 60 },
  };

  const budgetMap = {
    economico: { text: "Económico", percent: 20 },
    medio: { text: "Moderado", percent: 60 },
    premium: { text: "Premium", percent: 95 },
  };

  const companionMap = {
    aventura: { text: "Aventura & Naturaleza", percent: 85 },
    fiesta: { text: "Social & Fiesta", percent: 90 },
    confort: { text: "Relajado & Cultural", percent: 50 },
  };

  // Funciones auxiliares
  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function formatTravelDates(startDateStr, endDateStr) {
    if (!startDateStr || !endDateStr) {
      return "Fechas a definir";
    }

    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const startParts = startDateStr.split("-");
    const endParts = endDateStr.split("-");

    if (startParts.length !== 3 || endParts.length !== 3)
      return "Fechas a definir";

    const startDay = parseInt(startParts[2], 10);
    const startMonthIndex = parseInt(startParts[1], 10) - 1;
    const endDay = parseInt(endParts[2], 10);
    const endMonthIndex = parseInt(endParts[1], 10) - 1;

    const startMonth = months[startMonthIndex] || "";
    const endMonth = months[endMonthIndex] || "";

    if (startMonthIndex === endMonthIndex) {
      return `${String(startDay).padStart(2, "0")} - ${String(endDay).padStart(2, "0")} ${startMonth}`;
    } else {
      return `${String(startDay).padStart(2, "0")} ${startMonth} - ${String(endDay).padStart(2, "0")} ${endMonth}`;
    }
  }

  // Funciones principales
  function populateModals() {
    if (modalProfileName) modalProfileName.value = userName;
    if (modalProfileAge) modalProfileAge.value = userAge;
    if (modalProfileHometown) modalProfileHometown.value = userHometown;
    if (modalProfileBio) modalProfileBio.value = userBio;
    if (modalProfileLanguages) modalProfileLanguages.value = userLanguages;
    if (modalProfileInterests) modalProfileInterests.value = userInterests;

    if (modalTripDestination) modalTripDestination.value = userDestination;
    if (modalTripStartDate) modalTripStartDate.value = userStartDate;
    if (modalTripEndDate) modalTripEndDate.value = userEndDate;

    document.querySelectorAll(".avatar-selector-img").forEach((img) => {
      img.classList.toggle("selected", img.src === userAvatar);
      img.addEventListener("click", function () {
        document
          .querySelectorAll(".avatar-selector-img")
          .forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");
        userAvatar = this.src;
      });
    });
  }

  function updateProfileProgress() {
    let score = 0;

    if (userName !== "") score += 10;
    if (userAge !== "") score += 10;
    if (userHometown !== "") score += 10;
    if (userBio !== "") score += 15;
    if (userAvatar !== "https://i.pravatar.cc/150?img=12") score += 15;

    let prefStyle =
      localStorage.getItem("user_travel_style_key") || "mochilero";
    let prefBudget = localStorage.getItem("user_budget") || "economico";
    let prefCompanion =
      localStorage.getItem("user_companion_style") || "aventura";

    if (prefStyle !== "") score += 10;
    if (prefCompanion !== "") score += 10;
    if (prefBudget !== "") score += 5;

    if (userDestination !== "") score += 5;
    if (userStartDate !== "" && userEndDate !== "") score += 5;
    if (userInterests !== "") score += 5;
    if (userLanguages !== "") score += 5;

    const percentage = Math.min(score, 100);

    if (previewPageProgress) previewPageProgress.style.width = percentage + "%";
    if (previewPageProgressText)
      previewPageProgressText.innerText = percentage + "% completado";

    if (sidebarProgress) sidebarProgress.style.width = percentage + "%";
    if (sidebarProgressText)
      sidebarProgressText.innerText = percentage + "% completado";

    if (sidebarNameText)
      sidebarNameText.innerText = userName || "Compañere";
    if (sidebarAvatarImg) sidebarAvatarImg.src = userAvatar;

    return percentage;
  }

  function populatePreview() {
    if (prevNameText) prevNameText.innerText = userName;
    if (prevAgeText) prevAgeText.innerText = `${userAge} años`;
    if (prevHometownText) prevHometownText.innerText = userHometown;

    if (prevBioHeader) prevBioHeader.innerText = userBio;
    if (prevBioDetail) prevBioDetail.innerText = userBio;
    if (prevAvatarImg) prevAvatarImg.src = userAvatar;

    let matchedProfile =
      localStorage.getItem("user_travel_style") || "A definir";
    if (prevStyleBadge) prevStyleBadge.innerText = matchedProfile;

    if (prevDetailDest)
      prevDetailDest.innerText = userDestination || "A definir";
    if (prevDetailDates)
      prevDetailDates.innerText = formatTravelDates(userStartDate, userEndDate);

    let prefBudget = localStorage.getItem("user_budget") || "economico";
    const budgetText =
      {
        economico: "Económico (USD 500 - 1000)",
        medio: "Moderado (USD 1000 - 1800)",
        premium: "Premium (USD 2000+)",
      }[prefBudget] || "A definir";
    if (prevDetailBudget) prevDetailBudget.innerText = budgetText;

    if (prevDetailLanguages)
      prevDetailLanguages.innerText = userLanguages || "A definir";

    if (prevInterestPills) {
      prevInterestPills.textContent = "";
      if (userInterests) {
        const interestList = userInterests
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i !== "");
        interestList.forEach((interest) => {
          const normalized = normalizeText(interest);
          let iconClass = "bi-tag-fill";
          for (const group of iconMap) {
            if (group.keywords.some((kw) => normalized.includes(kw))) {
              iconClass = group.icon;
              break;
            }
          }
          const pill = document.createElement("span");
          pill.className =
            "badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-10 me-1 mb-1";
          
          const icon = document.createElement("i");
          icon.className = `bi ${iconClass} me-1`;
          
          pill.appendChild(icon);
          pill.appendChild(document.createTextNode(" " + interest));
          
          prevInterestPills.appendChild(pill);
        });
      } else {
        const noInterests = document.createElement("span");
        noInterests.className = "text-muted small italic";
        noInterests.innerText = "No se cargaron intereses";
        prevInterestPills.appendChild(noInterests);
      }
    }

    let prefStyle =
      localStorage.getItem("user_travel_style_key") || "mochilero";
    let prefCompanion =
      localStorage.getItem("user_companion_style") || "aventura";

    const travelStyleData =
      travelStyleMap[prefStyle] || travelStyleMap["mochilero"];
    const barTravelStyleText = document.getElementById("barTravelStyleText");
    const barTravelStyleFill = document.getElementById("barTravelStyleFill");
    if (barTravelStyleText) barTravelStyleText.innerText = travelStyleData.text;
    if (barTravelStyleFill)
      barTravelStyleFill.style.width = travelStyleData.percent + "%";

    const budgetPrefData = budgetMap[prefBudget] || budgetMap["medio"];
    const barBudgetText = document.getElementById("barBudgetText");
    const barBudgetFill = document.getElementById("barBudgetFill");
    if (barBudgetText) barBudgetText.innerText = budgetPrefData.text;
    if (barBudgetFill) barBudgetFill.style.width = budgetPrefData.percent + "%";

    const companionData =
      companionMap[prefCompanion] || companionMap["aventura"];
    const barCompanionText = document.getElementById("barCompanionText");
    const barCompanionFill = document.getElementById("barCompanionFill");
    if (barCompanionText) barCompanionText.innerText = companionData.text;
    if (barCompanionFill)
      barCompanionFill.style.width = companionData.percent + "%";
  }

  // Ejecución inicial de vista
  populateModals();
  updateProfileProgress();
  populatePreview();

  if (window.location.search.includes("action=test")) {
    const testModalEl = document.getElementById("travelerTestModal");
    if (testModalEl) {
      const bsModal = new bootstrap.Modal(testModalEl);
      bsModal.show();
      window.history.replaceState({}, document.title, "perfil.html");
    }
  }

  // Eventos
  if (btnSaveProfileInfo) {
    btnSaveProfileInfo.addEventListener("click", function (e) {
      e.preventDefault();
      userName = modalProfileName.value.trim();
      userAge = modalProfileAge.value.trim();
      userHometown =
        modalProfileHometown.value.trim();
      userBio =
        modalProfileBio.value.trim();
      userLanguages = modalProfileLanguages.value.trim();
      userInterests = modalProfileInterests.value.trim();

      localStorage.setItem("user_name", userName);
      localStorage.setItem("user_age", userAge);
      localStorage.setItem("user_hometown", userHometown);
      localStorage.setItem("user_bio", userBio);
      localStorage.setItem("user_avatar", userAvatar);
      localStorage.setItem("user_languages", userLanguages);
      localStorage.setItem("user_interests", userInterests);

      updateProfileProgress();
      populatePreview();

      bootstrap.Modal.getInstance(
        document.getElementById("editProfileInfoModal"),
      ).hide();

      if (toastInstance) toastInstance.show();
    });
  }

  if (btnSaveTripDetails) {
    btnSaveTripDetails.addEventListener("click", function (e) {
      e.preventDefault();
      userDestination = modalTripDestination.value.trim();
      userStartDate = modalTripStartDate.value;
      userEndDate = modalTripEndDate.value;

      localStorage.setItem("user_destination", userDestination);
      localStorage.setItem("user_start_date", userStartDate);
      localStorage.setItem("user_end_date", userEndDate);

      updateProfileProgress();
      populatePreview();

      bootstrap.Modal.getInstance(
        document.getElementById("editTripDetailsModal"),
      ).hide();

      if (toastInstance) toastInstance.show();
    });
  }

  if (btnSaveTestProfile) {
    btnSaveTestProfile.addEventListener("click", function (e) {
      e.preventDefault();
      updateProfileProgress();
      populatePreview();
      if (toastInstance) toastInstance.show();
    });
  }

  const logoutBtn = document.getElementById("btnLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.clear();
      window.location.replace("index.html");
    });
  }
})();

// Eventos (Globales)
document.querySelectorAll(".btn-logout-profile").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "index.html";
  });
});
