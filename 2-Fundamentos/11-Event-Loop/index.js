function a() {
    console.log("Executando a()");
    b()
}

function b() {
    console.log("Executando b()");
}

function c() {
    console.log("Executando c()");
    b()
    a()
}

c()
