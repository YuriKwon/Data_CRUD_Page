'use strict';

// 성별, 이름 검색에 맞춰 데이터 조회
async function doSearch() {
    // TODO: 화면 시작 시? 로딩 시 그려지도록 이벤트 걸기
    const gender = document.querySelector('#gender').value;
    const name = document.querySelector('#name').value;
    let resource = 'http://localhost:3000/customers';

    if (gender === '') {
        // 성별 전체, 이름 검색어가 입력된 경우
        if (name !== '') {
            // name=이 아니고 name_like인 이유: 포함되는 걸 찾는 것이라서
            resource = `http://localhost:3000/customers?name_like=${name}`;
        }
    } else {
        // 성별 필터링이 되어있을 때!
        if (name === '') {
            resource = `http://localhost:3000/customers?gender=${gender}`;
        } else {
            resource = `http://localhost:3000/customers?gender=${gender}&name_like=${name}`;
        }
    }

    const res = await fetch(resource);
    const resJson = await res.json();
    console.log(res);
    console.log(resJson);
    renderTable(resJson);
}

// async function init() {}

function renderTable(data) {
    const elements = [];
    for (const item of data) {
        elements.push(`<tr>`);
        elements.push(`<td><input type="checkbox" value="${item.id}" name="chk" onchange="isChecked();" /></td>`);
        elements.push(`<td>${item.name}</td>`);
        elements.push(`<td>${item.gender}</td>`);
        elements.push(`<td>${item.company}</td>`);
        elements.push(`<td>${item.email}</td>`);
        elements.push(`<td>${item.phone}</td>`);
        elements.push(`</tr>`);
    }

    document.querySelector('#tbBody').innerHTML = elements.join('');
}
