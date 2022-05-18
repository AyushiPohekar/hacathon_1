var optdiv = document.createElement('div');
optdiv.setAttribute('class', 'tableData')
var cur_page = 0;
var records_per_page = 5;
var max_pages = Math.ceil(50 / records_per_page);
function prev_Page() {
    if (cur_page > 1) {
        changePage(cur_page - 1)
    }
}
function next_Page() {
    if (cur_page < max_pages) {
        changePage(cur_page + 1)
    }
}
function changePage(num) {
    if (num < 1) num = 1;
    if (num > max_pages) num = max_pages;

    var startPoint = (num - 1) * records_per_page;
    var endPoint = (num) * records_per_page;

    cur_page = num;
    CreateDataTable(startPoint, endPoint);

    if (num === 1) {
        document.getElementById('prev').style.visibility = "hidden";
    } else {
        document.getElementById('prev').style.visibility = "visible";
    }

    if (num === max_pages) {
        document.getElementById('next').style.visibility = "hidden";
    } else {
        document.getElementById('next').style.visibility = "visible";
    }
}
function CreateDataTable(start, end) {
    optdiv.innerHTML = " ";
    async function Poke_1() {
        try {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50");
            console.log(response);
            let data = await response.json();
            console.log(data);

            var table = document.createElement('table');
            table.setAttribute('class', 'dataTable');
            table.id = "DataTable";

            var thead = document.createElement('thead');
            var tbody = document.createElement('tbody');

            var tr1 = document.createElement('tr');
            var th1 = document.createElement('th');
            th1.innerHTML = "Name";

            var th2 = document.createElement('th');
            th2.innerHTML = "Ability";

            var th3 = document.createElement('th');
            th3.innerHTML = "Moves";

            var th4 = document.createElement('th');
            th4.innerHTML = "weight";


            optdiv.append(table);
            table.append(thead, tbody);
            thead.append(tr1);
            tr1.append(th1, th2, th3, th4);




            for (let i = start; i < end; i++) {
                var pok_name = data.results[i].name;

                var pok_url = `https://pokeapi.co/api/v2/pokemon/${pok_name}`;



                let tr2 = document.createElement('tr');

                let td1 = document.createElement('td');
                td1.innerHTML = data.results[i].name;

                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');

                async function Poke_inner() {
                    try {
                        let response = await fetch(data.results[i].url);
                        console.log(response);
                        let data1 = await response.json();
                        console.log(data1);

                        var str1 = "";
                        for (var j = 0; j < data1.abilities.length; j++) {
                            if (j < 3) {
                                str1 = str1 + data1.abilities[j].ability.name + ',';



                            }
                            else {
                                var remaining = data.abilities.length - j;
                                str1 = str1 + "+" + String(remaining) + "more";
                                break;
                            }

                        }
                        td2.innerHTML = str1.slice(0, -1);

                        var str2 = "";
                        for (var k = 0; j < data1.moves.length; k++) {
                            if (k < 5) {
                                str2 = str2 + data1.moves[k].move.name + ',';



                            }
                            else {
                                var remaining = data1.moves.length - k;
                                str2 = str2 + "+" + String(remaining) + "more";
                                break;
                            }

                        }
                        td3.innerHTML = str2;
                        td4.innerHTML = data1.weight;

                        tr2.append(td1, td2, td3, td4);
                        tbody.append(tr2);
                    } catch (error) {
                        console.log(error);
                    }



                }
                Poke_inner();


                console.log(cur_page);



            }


        }
        catch (error) {
            console.log(error);
        }


    }
    Poke_1();
}



var d = document.createElement('div');
d.setAttribute('class', 'anchorlist');

var prev = document.createElement('a');
prev.href = `javascript:prev_Page()`;
prev.id = "prev";
prev.innerHTML = "&laquo;";

var next = document.createElement('a');
next.href = `javascript:next_Page()`;
next.id = "next";
next.innerHTML = "&raquo;";

var arr = createAnchorList();


function createAnchorList() {
    var ar = [];
    for (let i = 1; i <= 10; i++) {

        var a = document.createElement('a');
        a.href = `javascript:changePage(${i})`;
        a.innerHTML = i;
        if (i === 1) {
            a.setAttribute('class', 'active');
        }
        ar.push(a);
    }
    return ar;
}




document.body.append(optdiv, d);
d.append(prev, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], next);

changePage(1);

var container = document.createElement("container");
container.setAttribute("id", "container")
var form = document.createElement("form");
form.setAttribute("id", "myform");
var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "name");
input.setAttribute("required", true);
var br1 = linebreak();
var br2 = linebreak();
var sub = document.createElement("input");
sub.setAttribute("type", "submit");
sub.setAttribute("value", "search by name");
sub.setAttribute("id", "sb");
form.append(input, br1, br2, sub);
container.append(form);
document.body.append(container);
function linebreak() {
    var br = document.createElement("br");
    return br;
}

let division1 = document.createElement("div");
division1.setAttribute("id", "name1");
document.body.append(division1);

linebreak();
linebreak();
linebreak();
let division2 = document.createElement("div");
division2.setAttribute("id", "ab");

linebreak();
linebreak();
linebreak();
let division3 = document.createElement("div");
division3.setAttribute("id", "move1");

linebreak();
linebreak();
linebreak();
let division4 = document.createElement("div");
division4.setAttribute("id", "weight1");

linebreak();
linebreak();
linebreak();
let card = document.createElement("div");
card.setAttribute("class", "card");
let cardbody = document.createElement("div");
cardbody.setAttribute("class", "card-body");
card.append(cardbody);
cardbody.append(division1, division2, division3, division4);
container.append(card);
document.body.append(container);
var formres = document.getElementById("myform");
formres.addEventListener("submit", (event) => {
    event.preventDefault();
    var name = document.getElementById("name").value;
    console.log(name);
    var url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    Pokemon(url);
});

async function Pokemon(url) {
    try {
        let response = await fetch(url);
        console.log(response);
        let data = await response.json();
        console.log(data);



        let name1 = document.getElementById("name1");
        let ab = document.getElementById("ab");
        let move1 = document.getElementById("move1");
        let weight1 = document.getElementById("weight1");

        name1.innerHTML = " ";
        name1.append(`1.NAME OF POKEMON IS:  ${data.name}`);
        

        ab.innerHTML = "2.ABILITIES OF POKEMON ARE: ";

        for (var i = 0; i < data.abilities.length; i++) {
            ab.append(`${data.abilities[i].ability.name}`)

            ab.append(',');

        }
        move1.innerHTML = "3.MOVES OF POKEMON ARE: ";
        for (var j = 0; j < data.moves.length; j++) {
            if (j < 5) {
                move1.append(`${data.moves[j].move.name}`);
                move1.append(",");

            }
            else {
                var remaining = data.moves.length - j;
                move1.append("+" + String(remaining) + "more");
                break;
            }
        }
        weight1.innerHTML = "4.WEIGHT OF POKEMON IS: ";
        weight1.append(`${data.weight}`);



    } catch (error) {
        console.log(error);
    }
}

