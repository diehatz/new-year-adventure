/* GNYO collaborative technical pilot: static GitHub Pages frontend.
   JSONP is READ ONLY and exposes no nicknames. Writes are form POSTs to a
   hidden iframe, followed by a read-back verification of the player's ID. */
(() => {
  'use strict';
  const STORAGE_KEY = 'gnyo_technical_pilot_v1';
  const BRANCHES = ['months', 'wishes', 'detective'];
  const tdata = {
    ru: {
      connReady:'Связь установлена',connError:'Нет связи',connUnset:'Не подключено',connWait:'Проверка связи…',
      pilot:'ТЕХНИЧЕСКИЙ ПИЛОТ · ДВА ЭПИЗОДА', title:'The Monthly Meltdown',
      intro:'У 2027-го снова проблемы с календарём. Три подразделения нуждаются в помощи. Каждый сотрудник отправится на собственную операцию — а завтра вся команда увидит последствия.',
      notice:'Это техническая мини-версия, а не готовый сценарий. Иллюстрации и задания пока условные.',
      labelName:'Позывной / никнейм',placeholder:'Например, Penguin007', join:'Получить пропуск',nameHelp:'2–24 символа: буквы, цифры, пробел, _ . -; без настоящих фамилий.',
      welcome:'Добро пожаловать',day1:'ТЕСТОВЫЙ ДЕНЬ 1',day2:'ТЕСТОВЫЙ ДЕНЬ 2',
      branchChoose:'Выбери направление экстренной помощи',branchHint:'В настоящей игре выбор может зависеть от сюжета. Здесь нам важно проверить, что разные маршруты записываются отдельно.',
      qStep:'СИТУАЦИЯ',next:'Продолжить',back:'Назад',review:'Проверка отправки',
      reviewHelp:'Мы отправим два выбора в Google Таблицу. Результат вычислит сервер, а не браузер.',
      reviewBranch:'Подразделение',reviewAnswer1:'Решение 1',reviewAnswer2:'Решение 2',
      submit:'Отправить результат',saving:'Отправляем и проверяем запись…',waiting:'Ожидаем подтверждения от Google Таблицы.',
      retry:'Повторить отправку',sync:'Обновить данные',syncing:'Проверка…',
      success:'Результат подтверждён',successDesc:'Ваша запись найдена в Google Таблице. Повторное нажатие или обновление страницы не создадут второй голос.',
      stillOpen:'Теперь ждём закрытия тестового дня. Пока можно посмотреть предварительную статистику.',
      closedTitle:'Окно отправки закрыто',closedDesc:'Тестовый день зафиксирован. Новые результаты уже не принимаются; общую историю можно посмотреть ниже.',
      finalTitle:'Behind the G.O.A.T.',finalIntro:'Результаты разных групп собрались в единую историю. Все игроки видят одни и те же коллективные события, но сохраняют свой личный маршрут.',
      finalStep:'СООБЩЕНИЕ ИЗ ШТАБ-КВАРТИРЫ',finalOutro:'2027 получил общую картину происшествия и готовится к практическому испытанию. Продолжение будет зависеть от того, какие службы смогли ему помочь.',
      prelim:'ТЕКУЩИЙ КОЛЛЕКТИВНЫЙ ПРОГРЕСС',frozen:'ЗАФИКСИРОВАННЫЕ РЕЗУЛЬТАТЫ',players:'Участников',pendingTitle:'Отправка ещё не подтверждена',
      pendingDesc:'Мы сохранили запрос в этом браузере. Если сеть прервалась, можно повторить отправку: сервер засчитывает только одну запись на игрока.',
      credentials:'Личное дело',showCredentials:'Перенести личное дело',hideCredentials:'Скрыть перенос',
      exportTitle:'Экспорт',exportNote:'Скопируй этот код, чтобы продолжить на другом устройстве. Код содержит только тестовый идентификатор и никнейм. Не публикуй его открыто.',
      importTitle:'Импорт',importPlaceholder:'Вставь код личного дела',import:'Импортировать код',importWarning:'Импорт заменит текущий профиль в этом браузере.',
      noConnection:'Адрес Google Apps Script пока не указан в config.js. Можно просмотреть интерфейс и выбрать маршрут, но отправка будет недоступна.',
      wrongConnection:'Не удалось получить ответ от Google Apps Script. Проверь URL /exec, настройки доступа, корпоративные блокировки и новую публикацию после обновления кода.',
      errNickname:'Укажи никнейм из 2–24 разрешённых символов.',errImport:'Не удалось прочитать код личного дела.',errNotConfigured:'Сначала подключи Google Apps Script в config.js.',
      myOutcome:'Личный результат',resultGood:'Успешно',resultPartial:'Частично',resultTrouble:'Сложности',resultUnvisited:'Без помощи игроков',resultUnknown:'—',
      howTo:'Тест без сервера: создай Google Таблицу, запусти setupPilot(), опубликуй Apps Script как веб-приложение и вставь /exec URL в config.js.',
      ownBranch:'Твой маршрут',saveLocal:'Выборы сохраняются автоматически в браузере.',noPlayers:'Пока нет отправленных результатов.',
      archive:'Общие события дня 2',errorNote:'При сбоях открой инструменты разработчика → Console и проверь выполнение Apps Script → Executions.',
      branches:{
        months:{emoji:'📅',title:'The Monthly Union',desc:'Переговоры с бастующими Месяцами',questions:[
          {prompt:'Январь отказывается брать ещё одну пачку обещаний «новая жизнь». Как начать переговоры?',options:[['A','Выяснить реальную нагрузку и причины отказа'],['B','Предложить временный компромисс без проверки'],['C','Напомнить, что график уже утверждён']]},
          {prompt:'Месяцы требуют исправить распределение работы. Что предложить?',options:[['A','Согласовать измеримые условия и ответственных'],['B','Раздать всем одинаковое число заявок'],['C','Обещать, что завтра всё само наладится']]}
        ],stories:{good:'Месяцы согласовали новый порядок работы и согласились помочь с практическим испытанием 2027-го.',partial:'Месяцы подписали временное перемирие. Прежде чем помочь, они хотят уточнить распределение обязанностей.',trouble:'Переговоры зашли в тупик. На помощь вызвали архивиста 2007-го с древними процедурами урегулирования.',unvisited:'Никто из игроков не присоединился к переговорам. Месяцы продолжают решать вопрос самостоятельно; понадобится дополнительная встреча.'}},
        wishes:{emoji:'✉️',title:'The Impossible Wishlist',desc:'Пожелания и несчастный Декабрь',questions:[
          {prompt:'В одной папке лежат надежды, личные обещания и просьбы к организации. С чего начать?',options:[['A','Разделить запросы по типам, не обещая исполнения'],['B','Срочно отправить всё Январю'],['C','Автоматически подтвердить исполнение каждой просьбы']]},
          {prompt:'Появилось пожелание «Хочу, чтобы каждый день был пятницей». Твои действия?',options:[['A','Отметить как личное пожелание, не как приказ календарю'],['B','Попросить автора сформулировать конкретнее'],['C','Включить изменение графика для всех сотрудников']]}
        ],stories:{good:'Письма бережно разобраны. До 2027-го дошли искренние надежды людей, а система перестала путать пожелания с распоряжениями.',partial:'Основные категории восстановлены, но часть писем требует дополнительного разбора перед испытанием 2027-го.',trouble:'Автоматическая обработка породила новую очередь поручений. Декабрю пришлось вызвать подкрепление.',unvisited:'Декабрь оказался один на один с архивом пожеланий. Базовую сортировку выполняют сотрудники отдела, но очередь остаётся.'}},
        detective:{emoji:'🕵️',title:'The Case Files',desc:'Нуарное расследование вместе с 2026-м',questions:[
          {prompt:'В журналах обнаружены два распоряжения на одну и ту же задачу. Что проверять?',options:[['A','Источник, время и полномочия каждого распоряжения'],['B','Только последнее распоряжение'],['C','Сразу удалить оба журнала']]},
          {prompt:'Часть архивных данных отсутствует. Как продолжить?',options:[['A','Сопоставить журналы с бумажным архивом 2007-го'],['B','Сделать вывод по косвенным признакам, пометив пробелы'],['C','Объявить расследование завершённым без доказательств']]}
        ],stories:{good:'2026 восстановил цепочку событий и нашёл важные данные о двух контурах управления.',partial:'Детектив нашёл противоречия, но некоторые улики остаются неустановленными.',trouble:'Расследование зашло в тупик. 2007 открыл старый архив и предложил новый путь поиска.',unvisited:'2026 работал без нашей группы. Он обнаружил часть улик, но для полноты картины обратился к архивным материалам 2007-го.'}}
      }
    },
    en: {
      connReady:'Connected',connError:'No connection',connUnset:'Not connected',connWait:'Connecting…',
      pilot:'TECHNICAL PILOT · TWO EPISODES',title:'The Monthly Meltdown',
      intro:'2027 has tangled the calendar again. Three departments need help. Each employee joins a different mission — tomorrow, everyone will see what their choices changed.',
      notice:'This is a technical demonstration, not the final script. Art and tasks are placeholders.',
      labelName:'Call sign / nickname',placeholder:'For example, Penguin007',join:'Get access',nameHelp:'2–24 characters: letters, digits, space, _ . -; please do not use real names.',
      welcome:'Welcome',day1:'TEST DAY 1',day2:'TEST DAY 2',
      branchChoose:'Choose an emergency assignment',branchHint:'In the full game, assignments may be story-driven. Here we test whether independent routes are saved separately.',
      qStep:'SITUATION',next:'Continue',back:'Back',review:'Submission review',
      reviewHelp:'Your two choices will be sent to Google Sheets. The server, not the browser, calculates the outcome.',
      reviewBranch:'Department',reviewAnswer1:'Decision 1',reviewAnswer2:'Decision 2',
      submit:'Submit result',saving:'Submitting and verifying…',waiting:'Waiting for Google Sheets to confirm your entry.',
      retry:'Retry submission',sync:'Refresh data',syncing:'Checking…',
      success:'Result confirmed',successDesc:'Your record was found in Google Sheets. Reloading or resubmitting will not count the player twice.',
      stillOpen:'Waiting for the test day to close. Meanwhile, view provisional team statistics.',
      closedTitle:'Submission window closed',closedDesc:'Test day results have been frozen. New submissions are no longer accepted; the shared story is available below.',
      finalTitle:'Behind the G.O.A.T.',finalIntro:'Independent team results now shape one shared story. All players see the same collective events, while retaining their individual route.',
      finalStep:'MESSAGE FROM HEADQUARTERS',finalOutro:'2027 has received the full incident report and is preparing for a practical assessment. What happens next depends on which teams were able to help.',
      prelim:'LIVE TEAM PROGRESS',frozen:'FINAL TEAM RESULTS',players:'Players',pendingTitle:'Submission not yet confirmed',
      pendingDesc:'Your request is saved in this browser. If the network failed, retry safely: the server counts only one entry per player.',
      credentials:'Personnel file',showCredentials:'Transfer personnel file',hideCredentials:'Hide transfer',
      exportTitle:'Export',exportNote:'Copy this code to continue on another device. It includes only a test identifier and nickname. Do not publish it openly.',
      importTitle:'Import',importPlaceholder:'Paste the personnel-file code',import:'Import code',importWarning:'Importing replaces the current browser profile.',
      noConnection:'Google Apps Script is not configured in config.js. You can preview the interface and choices, but cannot submit.',
      wrongConnection:'Could not get a response from Google Apps Script. Check the /exec URL, access settings, corporate blockers and deployment version.',
      errNickname:'Enter a nickname with 2–24 permitted characters.',errImport:'Could not read the personnel-file code.',errNotConfigured:'Connect Google Apps Script in config.js first.',
      myOutcome:'Your result',resultGood:'Successful',resultPartial:'Partial',resultTrouble:'Needs help',resultUnvisited:'No player support',resultUnknown:'—',
      howTo:'To run live: create a Google Sheet, run setupPilot(), deploy Apps Script as a web app, and paste its /exec URL into config.js.',
      ownBranch:'Your route',saveLocal:'Choices are automatically saved in this browser.',noPlayers:'No submissions yet.',
      archive:'Shared story: day 2',errorNote:'To diagnose errors, inspect Developer Tools → Console and Apps Script → Executions.',
      branches:{
        months:{emoji:'📅',title:'The Monthly Union',desc:'Negotiate with the striking Months',questions:[
          {prompt:'January refuses another stack of “new year, new me” requests. What do you do first?',options:[['A','Check workload and find the cause of the objection'],['B','Offer a temporary compromise without checking'],['C','Remind January that the schedule is already approved']]},
          {prompt:'The Months ask for a better workload distribution. Your proposal?',options:[['A','Agree on measurable conditions and owners'],['B','Give everyone exactly the same number of requests'],['C','Promise it will fix itself tomorrow']]}
        ],stories:{good:'The Months agreed on a new workload plan and offered to support 2027’s practical assessment.',partial:'The Months signed a temporary truce, but want clearer responsibilities before offering support.',trouble:'Talks broke down. 2007 arrived with ancient conflict-resolution procedures.',unvisited:'No players joined the negotiation. The Months are working on their own and need an additional meeting.'}},
        wishes:{emoji:'✉️',title:'The Impossible Wishlist',desc:'Wishes and the unfortunate December',questions:[
          {prompt:'One folder contains hopes, personal resolutions and formal requests. Your first step?',options:[['A','Separate categories without promising outcomes'],['B','Send everything to January immediately'],['C','Auto-confirm that every wish will come true']]},
          {prompt:'A new request says “I wish every day were Friday.” What do you do?',options:[['A','Record a personal wish, not an order to the calendar'],['B','Ask the sender for a more specific request'],['C','Change the entire organization’s schedule']]}
        ],stories:{good:'The wishes are carefully categorized. 2027 received heartfelt hopes without turning them into mandatory orders.',partial:'The basic categories are restored, but several wishes need further review.',trouble:'Automated processing created a new queue of work orders. December called for backup.',unvisited:'December faced the wishlist archive alone. Staff have started sorting it, but a backlog remains.'}},
        detective:{emoji:'🕵️',title:'The Case Files',desc:'A noir investigation with 2026',questions:[
          {prompt:'Two orders refer to the same task. What evidence should be checked?',options:[['A','Source, time and authority of each order'],['B','Only the most recent order'],['C','Delete both logs immediately']]},
          {prompt:'Some logs are missing. What is the next move?',options:[['A','Compare logs with 2007’s paper archive'],['B','Make a provisional conclusion and flag gaps'],['C','Close the investigation without evidence']]}
        ],stories:{good:'2026 reconstructed the chain of events and identified the conflicting year-control systems.',partial:'The detective found inconsistencies, but some evidence is still missing.',trouble:'The case stalled. 2007 opened an old archive and suggested a different approach.',unvisited:'2026 worked alone and recovered some evidence, but needed 2007’s archive to fill the gaps.'}}
      }
    }
  };

  const app = document.getElementById('app');
  const connection = document.getElementById('connection');
  let state = load();
  let backend = null;
  let busy = false;
  let connecting = false;
  let error = '';
  let exportText = '';
  let importText = '';
  const url = String(window.GNYO_CONFIG?.appScriptUrl || '').trim();
  const configured = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec(?:\?.*)?$/.test(url);
  const dict = () => tdata[state.lang] || tdata.ru;
  const text = k => dict()[k];
  const branchData = b => dict().branches[b];

  function load() {
    try {
      const val = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (val && typeof val === 'object') return {
        lang: val.lang === 'en' ? 'en' : 'ru', id: typeof val.id === 'string' ? val.id : null,
        nickname: typeof val.nickname === 'string' ? val.nickname : '',
        branch: BRANCHES.includes(val.branch) ? val.branch : null,
        answers: Array.isArray(val.answers) ? val.answers.filter(x => ['A','B','C'].includes(x)).slice(0,2) : [],
        pending: val.pending && typeof val.pending === 'object' ? val.pending : null,
        submitted: !!val.submitted, identityOpen:false
      };
    } catch(e) { console.warn('Cannot read local progress',e); }
    return {lang:'ru',id:null,nickname:'',branch:null,answers:[],pending:null,submitted:false,identityOpen:false};
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang:state.lang,id:state.id,nickname:state.nickname,branch:state.branch,answers:state.answers,pending:state.pending,submitted:state.submitted })); }
    catch(e) { console.warn('Browser storage unavailable:',e); }
  }
  function safe(s) { return String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function uuid() { return crypto.randomUUID(); }
  function validName(n) { return /^[\p{L}\p{N}][\p{L}\p{N} _.-]{1,23}$/u.test(n.trim()); }
  function badgeOutcome(o) { return o==='good'?text('resultGood'):o==='partial'?text('resultPartial'):o==='trouble'?text('resultTrouble'):o==='unvisited'?text('resultUnvisited'):text('resultUnknown'); }
  function setNotice(txt, isError = false) { error=txt; render(); }

  function playerbar(){
    return `<div class="playerbar"><span class="tag">✦ ${safe(state.nickname)}</span><div class="actions"><button class="button small-btn ghost" data-action="sync">↻ ${text('sync')}</button><button class="button small-btn ghost" data-action="toggle-id">⇄ ${text(state.identityOpen?'hideCredentials':'showCredentials')}</button></div></div>${state.identityOpen?identityPanel():''}`;
  }
  function identityPanel(){
    return `<section class="export-box"><h3>${text('credentials')}</h3><p class="muted small">${text('exportNote')}</p><label class="label">${text('exportTitle')}</label><textarea id="export-code" readonly spellcheck="false">${safe(exportIdentity())}</textarea><div class="divider"></div><label class="label">${text('importTitle')}</label><textarea id="import-code" placeholder="${safe(text('importPlaceholder'))}" spellcheck="false">${safe(importText)}</textarea><p class="muted small">${text('importWarning')}</p><button type="button" class="button" data-action="import">${text('import')}</button></section>`;
  }
  function exportIdentity(){
    const obj={v:1,id:state.id,nickname:state.nickname};
    const bytes=new TextEncoder().encode(JSON.stringify(obj));
    let binary=''; bytes.forEach(b=>binary+=String.fromCharCode(b));
    return 'GNYO1:'+btoa(binary);
  }
  function importIdentity(code){
    if (!code.trim().startsWith('GNYO1:')) throw Error('prefix');
    const b=atob(code.trim().slice(6));
    const bytes=Uint8Array.from(b,c=>c.charCodeAt(0));
    const obj=JSON.parse(new TextDecoder().decode(bytes));
    if(obj.v!==1 || !/^[0-9a-f-]{36}$/i.test(obj.id) || !validName(obj.nickname)) throw Error('invalid');
    state.id=obj.id; state.nickname=obj.nickname; state.branch=null; state.answers=[]; state.pending=null; state.submitted=false; state.identityOpen=false;
    importText=''; backend=null; save(); refresh();
  }
  function stage(active){return `<div class="stage" aria-hidden="true">${[0,1,2,3].map(i=>`<span class="${i<=active?'on':''}"></span>`).join('')}</div>`;}
  function onboarding(){
    return `<section class="panel"><span class="eyebrow">${text('pilot')}</span><h1 class="hero-title">${text('title')}</h1><p class="lead">${text('intro')}</p><div class="intro-art" aria-hidden="true"><span class="avatar-emoji">🐐</span><span class="avatar-emoji">🐎</span><span class="avatar-emoji">🐗</span></div><div class="note">${text('notice')}</div><div class="divider"></div><form id="join-form"><label class="label" for="nickname">${text('labelName')}</label><input id="nickname" name="nickname" type="text" maxlength="24" placeholder="${safe(text('placeholder'))}" autocomplete="nickname" required><p class="muted small">${text('nameHelp')}</p><button class="button primary" type="submit">${text('join')} →</button></form><div class="divider"></div><label class="label">${text('importTitle')}</label><textarea id="import-code" placeholder="${safe(text('importPlaceholder'))}" spellcheck="false"></textarea><div class="actions"><button class="button ghost" data-action="import">${text('import')}</button></div></section>`;
  }
  function chooseBranch(){
    return `<section class="panel"><span class="eyebrow">${text('day1')}</span><h1 class="hero-title">${text('branchChoose')}</h1><p class="lead">${text('intro')}</p><p class="muted small">${text('branchHint')}</p>${stage(0)}<div class="cards">${BRANCHES.map(b=>{const d=branchData(b);return `<button type="button" class="route-card" data-action="branch" data-branch="${b}"><span class="emoji">${d.emoji}</span><strong>${d.title}</strong><small>${d.desc}</small></button>`}).join('')}</div><div class="note">${text('saveLocal')}</div></section>`;
  }
  function question(){
    const num=state.answers.length;
    const d=branchData(state.branch),q=d.questions[num];
    return `<section class="panel"><span class="eyebrow">${text('day1')} · ${d.title}</span>${stage(num+1)}<p class="label">${text('qStep')} ${num+1} / 2</p><h2 class="question-title">${q.prompt}</h2><div class="choice-list">${q.options.map(([val,label])=>`<button type="button" class="choice-card" data-action="answer" data-answer="${val}"><strong>${val}.</strong>${safe(label)}</button>`).join('')}</div><div class="actions"><button class="button ghost" data-action="back">← ${text('back')}</button></div></section>`;
  }
  function review(){
    const d=branchData(state.branch);
    return `<section class="panel"><span class="eyebrow">${text('day1')}</span>${stage(3)}<h2>${text('review')}</h2><p class="muted">${text('reviewHelp')}</p><div class="summary-list"><div class="summary-row"><span>${text('reviewBranch')}</span><strong>${d.emoji} ${d.title}</strong></div>${state.answers.map((answer,i)=>`<div class="summary-row"><span>${text(i===0?'reviewAnswer1':'reviewAnswer2')}</span><strong>${safe(d.questions[i].options.find(o=>o[0]===answer)?.[1] || answer)}</strong></div>`).join('')}</div>${!configured?`<div class="note warn">${text('noConnection')}</div>`:''}<div class="actions"><button class="button ghost" data-action="back">← ${text('back')}</button><button class="button primary" data-action="submit" ${!configured?'disabled':''}>${text('submit')} →</button></div></section>`;
  }
  function pendingPanel(){
    return `<section class="panel"><span class="eyebrow">${text('day1')}</span><h2>${busy?text('saving'):text('pendingTitle')}</h2><p class="muted">${busy?text('waiting'):text('pendingDesc')}</p><div class="actions"><button class="button primary" data-action="retry" ${busy?'disabled':''}>${text('retry')}</button><button class="button ghost" data-action="sync" ${busy?'disabled':''}>↻ ${text('sync')}</button></div></section>`;
  }
  function teamStats(){
    if(!backend?.stats) return '';
    const stats=backend.stats;
    return `<section class="panel"><span class="eyebrow">${backend.frozen?text('frozen'):text('prelim')}</span><h2>${text('players')}: ${Number(stats.total)||0}</h2><div class="status-list">${BRANCHES.map(b=>{const s=stats.branches[b];return `<div class="status-card"><div class="small muted">${branchData(b).emoji} ${branchData(b).title}</div><div class="number">${s?.participants || 0}</div><div class="description">${backend.frozen?badgeOutcome(s?.outcome):text('players')}</div></div>`}).join('')}</div>${!stats.total?`<p class="muted small">${text('noPlayers')}</p>`:''}</section>`;
  }
  function submittedPanel(){
    const my=backend?.mySubmission;
    const br=branchData(my?.branch||state.branch);
    return `<section class="panel"><span class="eyebrow">${text('day1')}</span><h2>✓ ${text('success')}</h2><p class="lead">${text('successDesc')}</p><div class="summary-list"><div class="summary-row"><span>${text('ownBranch')}</span><strong>${br.emoji} ${br.title}</strong></div><div class="summary-row"><span>${text('myOutcome')}</span><strong>${badgeOutcome(my?.outcome)}</strong></div></div><div class="note good">${text('stillOpen')}</div></section>${teamStats()}`;
  }
  function frozenPanel(){
    const my=backend?.mySubmission;
    const stories=BRANCHES.map(b=>{
      const d=branchData(b),s=backend.stats.branches[b],o=s?.outcome||'unvisited';
      return `<article class="chapter ${o}"><div class="small muted">${d.emoji} ${d.title} · ${badgeOutcome(o)} · ${s?.participants||0} ${text('players').toLowerCase()}</div><h3>${d.desc}</h3><p>${d.stories[o]||d.stories.unvisited}</p></article>`;
    }).join('');
    return `<section class="panel"><span class="eyebrow">${text('day2')}</span><h1 class="hero-title">${text('finalTitle')}</h1><p class="lead">${text('finalIntro')}</p>${my?`<div class="note good">${text('ownBranch')}: ${branchData(my.branch).title} · ${badgeOutcome(my.outcome)}</div>`:`<div class="note warn">${text('closedDesc')}</div>`}<div class="divider"></div><span class="eyebrow">${text('finalStep')}</span><h2>${text('archive')}</h2>${stories}<div class="divider"></div><p class="lead">${text('finalOutro')}</p></section>${teamStats()}`;
  }
  function render(){
    document.documentElement.lang=state.lang;
    document.getElementById('lang-ru').classList.toggle('active',state.lang==='ru');
    document.getElementById('lang-en').classList.toggle('active',state.lang==='en');
    connection.textContent='● '+(!configured?text('connUnset'):backend?text('connReady'):connecting?text('connWait'):text('connError'));
    connection.className='status-pill'+(backend?' online':configured&&!connecting?' error':'');
    let content = !state.id?onboarding():playerbar();
    if(state.id){
      if(configured&&!backend&&!state.pending){content+=`<section class="panel loading"><div class="loading-icon">✧</div><h2>${text('connWait')}</h2><p class="muted">${text('wrongConnection')}</p><button class="button" data-action="sync">↻ ${text('sync')}</button></section>`;}
      else if(backend?.phase==='published') content+=frozenPanel();
      else if(state.pending) content+=pendingPanel()+teamStats();
      else if(backend?.mySubmission||state.submitted) content+=submittedPanel();
      else if(!state.branch) content+=chooseBranch()+teamStats();
      else if(state.answers.length<2) content+=question();
      else content+=review();
    }
    if(error) content+=`<div class="toast error" role="alert">${safe(error)}</div>`;
    app.innerHTML=content;
  }
  function jsonp(){
    return new Promise((resolve,reject)=>{
      const cb='gnyoCb_'+Math.random().toString(36).slice(2,14);
      const script=document.createElement('script');
      const timer=setTimeout(()=>cleanup(new Error('JSONP timeout')),15000);
      function cleanup(err,data){clearTimeout(timer);script.remove();try{delete window[cb]}catch{};err?reject(err):resolve(data);}
      window[cb]=(data)=>cleanup(null,data);
      script.onerror=()=>cleanup(new Error('Script failed to load'));
      script.src=url+(url.includes('?')?'&':'?')+new URLSearchParams({action:'state',prefix:cb,playerId:state.id||'',t:String(Date.now())});
      document.head.appendChild(script);
    });
  }
  async function refresh(){
    if(!configured){render();return;}
    if(connecting) return;
    connecting=true;render();
    try{
      const data=await jsonp();
      if(!data?.ok)throw Error(data?.error||'Invalid server response');
      backend=data;error='';
      if(data.mySubmission){state.submitted=true;state.pending=null;state.branch=data.mySubmission.branch;save();}
      else if(data.phase==='open' && !state.pending && state.submitted){state.submitted=false;state.branch=null;state.answers=[];save();}
    }catch(e){console.error('GNYO status error',e);error=text('wrongConnection');}
    finally{connecting=false;render();}
  }
  function postPayload(p){
    const form=document.createElement('form'); form.method='POST';form.action=url;form.target='gnyo-hidden-post-target';form.style.display='none';
    const field=document.createElement('input');field.type='hidden';field.name='payload';field.value=JSON.stringify(p);
    form.appendChild(field);document.body.appendChild(form);form.submit();form.remove();
  }
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  async function sendPending(){
    if(!configured){setNotice(text('errNotConfigured'),true);return;}
    if(!state.pending||busy) return;
    busy=true;error='';render();
    try{
      postPayload(state.pending);
      for(let i=0;i<7;i++){
        await sleep(i<3?1800:2600);
        try{
          const data=await jsonp();
          if(data?.ok){backend=data;if(data.mySubmission){state.submitted=true;state.pending=null;save();error='';break;}}
        }catch(err){console.warn('Status retry',err);}
      }
    }catch(err){console.error('Failed to submit',err);}
    finally{busy=false;if(state.pending) error=state.lang==='ru'?'Нет подтверждения записи. Можно нажать «Повторить отправку».':'Submission not confirmed. You can safely retry.';render();}
  }
  function onAction(action, el){
    error='';
    if(action==='sync'){refresh();return;}
    if(action==='toggle-id'){state.identityOpen=!state.identityOpen;save();render();return;}
    if(action==='import'){
      try{const code=document.getElementById('import-code')?.value||'';importIdentity(code);}
      catch(e){setNotice(text('errImport'),true);}return;
    }
    if(action==='branch'){const b=el.dataset.branch;if(BRANCHES.includes(b)){state.branch=b;state.answers=[];save();render();}return;}
    if(action==='answer'){const a=el.dataset.answer;if(['A','B','C'].includes(a)&&state.answers.length<2){state.answers.push(a);save();render();}return;}
    if(action==='back'){if(state.answers.length)state.answers.pop();else state.branch=null;save();render();return;}
    if(action==='submit'){
      if(!configured){setNotice(text('errNotConfigured'),true);return;}
      if(!state.id||!state.branch||state.answers.length!==2||backend?.phase!=='open')return;
      state.pending={playerId:state.id,submissionId:uuid(),nickname:state.nickname,branch:state.branch,answers:state.answers.slice()};
      save();sendPending();return;
    }
    if(action==='retry'){sendPending();return;}
  }
  app.addEventListener('click', e=>{
    const btn=e.target.closest('button[data-action]');if(!btn)return;
    e.preventDefault();onAction(btn.dataset.action,btn);
  });
  app.addEventListener('submit',e=>{
    if(e.target.id!=='join-form')return;e.preventDefault();
    const name=String(new FormData(e.target).get('nickname')||'').trim();
    if(!validName(name)){setNotice(text('errNickname'),true);return;}
    state.id=uuid();state.nickname=name;state.branch=null;state.answers=[];state.submitted=false;save();refresh();
  });
  ['ru','en'].forEach(lang=>document.getElementById('lang-'+lang).addEventListener('click',()=>{state.lang=lang;save();render();}));
  render();
  if(configured)refresh();
})();
