if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../html/signin.html";
  }

  function sair() {
    localStorage.removeItem("token");
    window.location.href = "../html/signin.html";
  }