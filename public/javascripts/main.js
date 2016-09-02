$(function () {


    $('a[href*=#]:not([href=#])').not(".carousel-control").click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });


    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    var alerta = $("#alert-hiden").val();

    if (alerta === 'msg') {

        $('#myModal').modal('show')

    }


    $("#frmContato").validate({
        // Define as regras
        rules: {
            nome: {
                // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
                required: true
            },
            email: {
                // campoEmail será obrigatório (required) e precisará ser um e-mail válido (email)
                required: true, email: true
            },
            telefone: {
                // campoMensagem será obrigatório (required) e terá tamanho mínimo (minLength)
                required: true,
                minlength: 10
            },
            mensagem: {
                // campoMensagem será obrigatório (required) e terá tamanho mínimo (minLength)
                required: true
            }
        },
        // Define as mensagens de erro para cada regra
        messages: {
            nome: {
                required: "Digite o seu nome",
            },
            email: {
                required: "Digite o seu e-mail para contato",
                email: "Digite um e-mail válido"
            },
            telefone: {
                required: "Digite o seu telefone",
                minLength: "Seu telefone deve conter apenas números"
            },
            mensagem: {
                required: "Digite a sua mensagem",
            }
        }
    });

    $('#telefone').mask('(00) 0000-0000');


});