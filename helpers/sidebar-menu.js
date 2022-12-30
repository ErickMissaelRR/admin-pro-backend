const sidebarMenu = (role) => {

  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        {
          title: "Main",
          url: "/dashboard",
        },
        {
          title: "Progress bar",
          url: "/dashboard/progress",
        },
        {
          title: "Chart",
          url: "/dashboard/chart-one",
        },
        {
          title: "Promises",
          url: "/dashboard/promises",
        },
        {
          title: "Rxjs",
          url: "/dashboard/rxjs",
        },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu.push({
      title: "Users",
      icon: "mdi mdi-account-settings-variant",
      submenu: [
        {
          title: "Usuarios",
          url: "admin/users",
        },
        {
          title: "Médicos",
          url: "admin/medics",
        },
        {
          title: "Hospitales",
          url: "admin/hospitals",
        },
      ],
    });
  }

  return menu;
};

module.exports = {
    sidebarMenu
}
