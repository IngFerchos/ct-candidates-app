import Swal from "sweetalert2";

const isDarkTheme =  localStorage.theme === "dark" ||
                    (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);

const types = {
    success: {
        background: isDarkTheme?"#32B963":"#3ED575",
        iconColor: "#F4F4F4",
    },
    error: {
        background: isDarkTheme?"#D94040":"#C83D3D",
        iconColor: "#F4F4F4",
    },
    warning: {
        background: isDarkTheme?"#FBBF24":"#EED438",
        iconColor: "#F4F4F4",
    },
    info: {
        background: isDarkTheme?"#4A95F1":"#4299e1",
        iconColor: "#F4F4F4)",
    }
}

export function showNotification(type, tittle, message, isToast = true) {
    Swal.mixin({
        toast: isToast,
        position: "top-end",
        showConfirmButton: !isToast,
        timer: isToast?5000:undefined,
        timerProgressBar: isToast,
        buttonsStyling: false,
        iconColor: "#F4F4F4",
        background: types[type].background,
        customClass: {
            confirmButton: isToast?undefined:"bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-full text-white p-3 pl-5 pr-5 mr-3",
            cancelButton: isToast?undefined:"bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-full text-white p-3 pl-5 pr-5 ml-3",
            container: "bg-white dark:bg-gray-800",
            popup: "bg-white dark:bg-gray-200 rounded-xl",
            title: "text-white",
            htmlContainer: "bg-white dark:bg-gray-800"
        },
        didOpen: isToast?(toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }:undefined,
    }).fire({
        title: tittle,
        icon: type,
        text: message,
    });
}

