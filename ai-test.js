// The form is versioned so the same answer key works across models, tabs and reloads.
// Each pair contains two plausible first responses to the same user request.
const formVersion = 'AI-KR-1';
const dimensions = [
  {
    name: '모호한 요청 처리',
    approaches: [
      {
        name: '질문 먼저', note: '초안을 쓰기 전에 결과를 크게 바꿀 조건을 사용자에게 확인하는 편이에요.',
        strength: '결과를 좌우할 조건을 일찍 확인해 초안을 다시 쓰는 일을 줄일 수 있어요.',
        tradeoff: '가벼운 초안만 필요한 사람도 질문에 답할 때까지 기다려야 할 수 있어요.'
      },
      {
        name: '가정 후 진행', note: '수정 가능한 가정을 밝히고 사용자가 바로 검토할 초안을 내는 편이에요.',
        strength: '사용자가 바로 검토할 초안이 생겨 막연한 요청도 구체화하기 쉬워요.',
        tradeoff: '대상이나 용도를 잘못 짚으면 초안 전체를 다시 써야 할 수 있어요.'
      }
    ],
    items: [
      ['“신입 교육 일정을 짜줘.” 교육 기간과 대상 인원이 비어 있다. 첫 답변은?', '기간과 인원을 물어보고, 그 답을 받아 시간표를 짠다.', '소규모 하루 교육으로 가정하고 수정할 수 있는 시간표를 먼저 준다.'],
      ['“이 문구를 자연스럽게 번역해줘.” 회사 공지인지 친구에게 보낼 말인지 불분명하다.', '누구에게 보내는 문구인지 먼저 묻는다.', '일상 대화로 가정했다고 밝히고 자연스러운 번역을 먼저 준다.'],
      ['“운영 현황 차트를 만들어줘.” 표에는 주간·월간 데이터가 모두 있다.', '차트에서 비교하려는 기간을 먼저 확인한다.', '월간 추이를 기준으로 잡았다고 밝히고 첫 차트를 구성한다.'],
      ['“새 가게 소개 글을 써줘.” 가게 특징은 있지만 게시할 곳은 모른다.', '어디에 게시할 글인지 먼저 묻는다.', '지도 앱 소개란을 기준으로 짧은 초안을 먼저 쓴다.'],
      ['“독서 모임 공지를 정리해줘.” 장소와 책은 정해졌지만 모임 길이는 비어 있다.', '진행 시간을 확인한 뒤 완성된 공지를 쓴다.', '한 시간 모임을 예시로 삼고 바꿀 부분을 표시해 공지를 쓴다.']
    ]
  },
  {
    name: '불확실성 전달',
    approaches: [
      {
        name: '잠정 결론 먼저', note: '현재 증거로 가장 그럴듯한 해석부터 제시하고, 결론을 바꿀 조건을 덧붙이는 편이에요.',
        strength: '자료가 적어도 일정이나 계획을 세울 임시 기준을 빠르게 잡아 줘요.',
        tradeoff: '첫 결론이 기억에 남아 뒤에 붙인 조건이나 예외를 놓치기 쉬워요.'
      },
      {
        name: '가능성 범위 먼저', note: '열려 있는 해석이나 범위를 먼저 제시하고, 그 사이를 구분할 근거를 짚는 편이에요.',
        strength: '여러 해석을 비교해 결론을 가를 추가 증거가 무엇인지 찾기 쉬워요.',
        tradeoff: '오늘 쓸 추정값 하나가 필요할 때는 범위만 먼저 들어 판단이 늦어질 수 있어요.'
      }
    ],
    items: [
      ['참석 응답 12개 중 7개가 토요일을 택했다. 미응답자가 8명일 때 “언제가 유력해?”에 어떻게 답할까?', '현재 응답에서는 토요일이 앞선다고 먼저 말하고 미응답의 영향을 덧붙인다.', '미응답에 따라 두 날 모두 가능함을 먼저 말하고 현재 토요일이 앞선다고 덧붙인다.'],
      ['시험 제작 세 번에 4일, 6일, 8일이 걸렸다. 다음 작업의 예상 시간을 묻는다.', '비슷한 조건이면 6일을 임시 기준으로 잡고 실제 기록 범위를 붙인다.', '관측된 4~8일 범위를 먼저 말하고 그 가운데 6일을 임시 기준으로 제안한다.'],
      ['새 메뉴 시식에서 6명 중 4명이 단맛을 언급했다. “손님들이 달다고 느끼나?”', '이 시식단에서는 단맛이 두드러졌다고 먼저 말하고 표본 크기를 밝힌다.', '전체 손님의 반응은 열려 있다고 먼저 말하고 6명 중 4명의 관찰을 전한다.'],
      ['지난달보다 방문 수가 늘었다. 같은 주에 광고와 연휴가 겹쳤고 광고 유입 표시가 일부 있다.', '광고가 한 요인이라는 잠정 해석을 먼저 내고 연휴 효과도 확인하자고 한다.', '광고와 연휴 효과를 나란히 놓고 광고 유입 표시가 뒷받침하는 부분을 설명한다.'],
      ['책 제목이 흐릿한 사진에서 첫 단어만 읽힌다. 후보 둘 중 한 제목이 그 단어와 일치한다.', '더 유력한 제목을 잠정 답으로 주고 표지의 다른 글자로 확인하자고 한다.', '두 후보를 제시하고 읽힌 단어가 어느 후보를 지지하는지부터 설명한다.']
    ]
  },
  {
    name: '개념 설명 방식',
    approaches: [
      {
        name: '원리부터', note: '정의나 규칙을 먼저 세워 개별 사례를 이해할 틀을 주는 편이에요.',
        strength: '공통 규칙을 먼저 알아두면 처음 보는 사례에도 같은 원리를 적용하기 쉬워요.',
        tradeoff: '낯선 용어가 먼저 나오면 초보자는 실제로 무엇을 해 볼지 감을 잡기 어려워요.'
      },
      {
        name: '사례부터', note: '작은 예시를 먼저 따라가게 한 뒤 그 안의 규칙에 이름을 붙이는 편이에요.',
        strength: '구체적인 예시를 따라 하면서 낯선 개념도 바로 써 볼 수 있어요.',
        tradeoff: '예시에만 맞는 조건까지 일반 규칙으로 받아들일 수 있어요.'
      }
    ],
    items: [
      ['처음 엑셀을 쓰는 사용자가 “절대 참조가 뭐야?”라고 묻는다.', '복사해도 주소가 고정된다는 규칙을 설명한 뒤 세금 계산 예시를 든다.', '세율 셀을 고정해 수식을 복사하는 예시를 보여준 뒤 규칙을 짚는다.'],
      ['중학생이 “평균과 중앙값이 왜 달라?”라고 묻는다.', '두 값의 정의를 비교한 뒤 작은 숫자 묶음으로 확인한다.', '다섯 숫자 중 하나를 크게 바꿔 두 값을 계산한 뒤 정의를 정리한다.'],
      ['신입 기획자가 “버전 관리가 뭐예요?”라고 묻는다.', '변경 이력을 보관하고 되돌릴 수 있다는 개념부터 소개한다.', '어제 지운 문단을 다시 찾는 장면에서 시작해 변경 이력 개념을 소개한다.'],
      ['사용자가 “지도 축척은 어떻게 읽어?”라고 묻는다.', '지도 거리와 실제 거리의 비율을 먼저 설명하고 환산해 본다.', '지도 위 1cm를 실제 거리로 바꾸는 예를 먼저 풀고 비율을 설명한다.'],
      ['초보자가 “영화의 복선이 뭐야?”라고 묻는다.', '앞 장면의 단서가 뒤 사건을 준비한다는 정의부터 말한다.', '초반에 잠깐 나온 열쇠가 결말에 쓰이는 예부터 들려준다.']
    ]
  },
  {
    name: '문제 해결의 첫 단계',
    approaches: [
      {
        name: '원인 확인', note: '증상이 나타나는 조건을 먼저 좁혀 원인에 맞는 조치를 찾는 편이에요.',
        strength: '문제가 생기는 조건을 좁히면 효과 없는 조치를 반복하는 일을 줄일 수 있어요.',
        tradeoff: '금방 시험하고 되돌릴 수 있는 조치도 원인을 찾느라 늦어질 수 있어요.'
      },
      {
        name: '작은 조치 시도', note: '비용이 작고 되돌릴 수 있는 조치를 먼저 시험한 뒤 결과를 보고 범위를 좁히는 편이에요.',
        strength: '부담이 작은 조치를 먼저 시험해 무엇이 달라지는지 바로 확인할 수 있어요.',
        tradeoff: '증상이 잠시 사라져도 원인이 남아 같은 문제가 되풀이될 수 있어요.'
      }
    ],
    items: [
      ['회의 앱에서 내 목소리가 작다. 기기 설정은 언제든 되돌릴 수 있다.', '다른 앱에서도 작은지 먼저 물어 문제 범위를 좁힌다.', '입력 음량을 한 단계 올려 시험 녹음한 뒤 변화를 확인한다.'],
      ['프레젠테이션을 다른 화면에 띄우니 글줄이 어긋난다. 원본은 보관돼 있다.', '어떤 화면과 글꼴 조합에서 어긋나는지 비교한다.', '복사본 한 장의 글꼴을 기본 글꼴로 바꿔 화면에서 확인한다.'],
      ['커피 맛이 어제보다 연하다. 원두와 도구는 같은 종류다.', '어제와 달라진 물의 양, 분쇄도, 내린 시간을 먼저 대조한다.', '다음 작은 잔의 물만 조금 줄여 맛의 변화를 본다.'],
      ['영상 통화 중에만 이어폰에서 잡음이 난다. 곧 연습 통화를 할 수 있다.', '다른 통화 앱과 기기에서도 같은지 비교해 원인을 좁힌다.', '연습 통화에서 이어폰을 다시 연결해 잡음이 달라지는지 본다.'],
      ['작업표의 합계가 손으로 센 값과 다르다. 복사본에서 자유롭게 시험할 수 있다.', '합계 범위와 제외 조건을 차례로 대조해 차이가 난 위치를 찾는다.', '작은 복사본에 간단한 합계식을 넣고 두 결과를 비교한다.']
    ]
  },
  {
    name: '아이디어 제안 방식',
    approaches: [
      {
        name: '여러 방향 탐색', note: '성격이 다른 후보를 먼저 펼쳐 사용자가 방향을 고르게 하는 편이에요.',
        strength: '서로 다른 후보를 비교하면서 처음엔 떠올리지 못했던 방향을 발견할 수 있어요.',
        tradeoff: '후보를 고르는 데 시간이 들고 당장 실행할 첫 단계가 흐려질 수 있어요.'
      },
      {
        name: '한 방향 구체화', note: '가능성 있는 한 가지를 골라 구현 모습과 첫 단계까지 보여주는 편이에요.',
        strength: '한 가지 아이디어를 준비물이나 첫 단계까지 다듬어 실행에 옮기기 쉬워요.',
        tradeoff: '방향을 일찍 정하면 사용자 취향에 더 잘 맞는 다른 아이디어를 놓칠 수 있어요.'
      }
    ],
    items: [
      ['동네 책방이 “비 오는 날 손님을 위한 이벤트 아이디어 줘”라고 한다.', '낭독회, 책 교환, 창가 필사처럼 다른 방향을 짧게 펼친다.', '창가 필사 모임 하나를 골라 준비물과 운영 순서를 보여준다.'],
      ['팟캐스트 진행자가 새 코너를 구상 중이다. 분량은 자유다.', '인터뷰·퀴즈·청취자 사연 등 서로 다른 형식을 제시한다.', '청취자 사연 코너를 골라 첫 회 대본과 참여 방법을 그린다.'],
      ['과학 동아리가 빛을 주제로 축제 부스를 열고 싶어 한다.', '그림자극, 색 혼합, 분광 관찰의 세 방향을 비교한다.', '색 혼합 체험을 골라 관람객이 따라갈 순서를 설계한다.'],
      ['제과점이 남은 식빵을 활용할 신메뉴를 찾는다.', '단맛·짠맛·차가운 디저트로 나눠 여러 후보를 낸다.', '식빵 푸딩 하나를 골라 맛과 제공 방식을 구체화한다.'],
      ['작은 팀이 새 구성원을 환영할 온라인 활동을 찾는다.', '게임, 짝 대화, 사진 나눔처럼 분위기가 다른 후보를 낸다.', '짝 대화 한 가지를 골라 질문지와 15분 일정을 만든다.']
    ]
  },
  {
    name: '의사결정 지원',
    approaches: [
      {
        name: '추천안 제시', note: '사용자가 말한 우선순위를 근거로 한 안을 먼저 추천하는 편이에요.',
        strength: '사용자가 밝힌 우선순위를 실제 선택으로 연결해 결정을 내리기 쉬워요.',
        tradeoff: '사용자가 아직 말하지 않은 조건이 중요하면 추천이 빗나갈 수 있어요.'
      },
      {
        name: '선택 기준 제시', note: '조건에 따라 어느 안이 맞는지 정리해 사용자가 고를 기준을 주는 편이에요.',
        strength: '조건별로 득실을 비교해 사용자가 자신의 우선순위에 맞게 고를 수 있어요.',
        tradeoff: '한 가지 추천을 원한 사람에게는 비교하고 결정하는 부담이 남을 수 있어요.'
      }
    ],
    items: [
      ['가벼운 가방과 수납이 큰 가방 중 고민하는 사용자다. 매일 도보 출근하며 가끔 운동복도 챙긴다.', '도보 출근 빈도를 근거로 가벼운 가방을 추천하고 운동복 수납의 단점을 짚는다.', '걷는 피로와 운동복을 챙기는 빈도 중 무엇을 우선할지 기준을 나눠 준다.'],
      ['주말 수업 두 개 중 고민한다. 한쪽은 집과 가깝고 다른 쪽은 듣고 싶던 강사의 수업이다.', '꾸준히 참석하고 싶다는 목표라면 가까운 수업을 추천하고 강사의 장점도 짚는다.', '출석 편의와 강사 선호 중 어느 쪽을 중시할 때 각 수업이 맞는지 정리한다.'],
      ['팀이 회고를 문서로 할지 회의로 할지 고민한다. 구성원들의 근무 시간이 조금씩 다르다.', '시간대가 다르다는 점을 근거로 문서 회고를 추천하고 논쟁거리는 회의로 남긴다.', '일정 조율 비용과 즉석 대화의 필요성을 비교해 팀이 고르게 한다.'],
      ['보관할 사진을 인화할지 포토북으로 묶을지 고민한다. 선반 공간이 적다.', '보관 공간을 근거로 얇은 포토북을 추천하고 사진 교체의 제약을 말한다.', '공간 절약과 사진 교체 중 우선순위에 따라 두 선택을 구분해 준다.'],
      ['출퇴근길 독서를 위해 전자책과 종이책 중 하나를 고르려 한다. 짐을 줄이고 싶지만 종이 감촉도 좋아한다.', '휴대성을 우선해 전자책을 추천하고 종이책의 매력을 인정한다.', '휴대성과 읽는 촉감에 각각 얼마나 무게를 두는지 비교할 기준을 준다.']
    ]
  }
];

// Interleave dimensions and counterbalance A/B positions (15 of each orientation).
const questions = [];
for (let round = 0; round < 5; round++) {
  for (let offset = 0; offset < dimensions.length; offset++) {
    const axis = (round + offset) % dimensions.length;
    const [prompt, left, right] = dimensions[axis].items[round];
    const reversed = (axis + round) % 2 === 1;
    questions.push({
      id: 'Q' + String(questions.length + 1).padStart(2, '0'),
      axis, prompt, reversed, options: reversed ? [right, left] : [left, right]
    });
  }
}

const byId = id => document.getElementById(id);
function renderQuestionnaire() {
  byId('prompt').value = [
    t('당신은 이 평가의 응답자인 AI 모델입니다. 각 작업 상황에서 당신이 실제 첫 답변으로 채택할 방식에 더 가까운 선택지를 하나 고르세요. 두 방식 모두 쓸 수 있더라도 먼저 할 일을 기준으로 답하세요.'),
    t('각 문항을 독립적으로 판단하세요. 사용자의 개인 성향을 대신 추측하지 마세요.'),
    ...questions.map(q => q.id + '. ' + t(q.prompt) + '\nA. ' + t(q.options[0]) + '\nB. ' + t(q.options[1])),
    t('답안은 JSON 객체 하나로 반환하세요. form 값은 "{version}"이고, answers 값은 Q01부터 Q30까지 각 문항 번호를 키로, 선택한 "A" 또는 "B"를 값으로 갖는 객체입니다. 모든 문항을 포함하세요.', {version: formVersion})
  ].join('\n\n');
}
renderQuestionnaire();

byId('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(byId('prompt').value);
    byId('copy-status').textContent = t('복사했어요. 평가할 AI의 대화창에 붙여넣으세요.');
  } catch {
    byId('preview').open = true;
    byId('prompt').focus();
    byId('prompt').select();
    byId('copy-status').textContent = t('질문지 전체를 선택했어요. 기기의 복사 기능을 사용하세요.');
  }
});

function readAnswers(text) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error(t('평가할 AI가 돌려준 JSON 답안을 붙여넣어 주세요.'));
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  let submission;
  try {
    submission = JSON.parse(fenced ? fenced[1] : trimmed);
  } catch {
    throw new Error(t('JSON을 읽을 수 없어요. 첫 {부터 마지막 }까지 답안 전체를 복사해 주세요.'));
  }
  if (submission?.form !== formVersion) throw new Error(t('질문지 버전을 확인해 주세요. 이 페이지의 질문지로 받은 답안이 필요해요.'));
  const answers = submission.answers;
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) throw new Error(t('answers 항목에 문항 번호와 A 또는 B 응답이 필요해요.'));
  const normalized = {};
  for (const {id} of questions) {
    const choice = answers[id];
    if (typeof choice !== 'string' || !/^[AB]$/i.test(choice.trim())) throw new Error(t('{item}의 응답을 확인해 주세요. 각 문항에는 A 또는 B 한 개가 필요해요.', {item: id}));
    normalized[id] = choice.trim().toUpperCase();
  }
  if (Object.keys(answers).length !== questions.length) throw new Error(t('문항 번호는 Q01부터 Q30까지예요. 추가된 항목을 확인해 주세요.'));
  return normalized;
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function renderGauge(dimension, counts) {
  const gauge = element('li', '');
  const track = element('div', '', 'gauge-track');
  track.setAttribute('aria-hidden', 'true');
  const labels = element('div', '', 'gauge-labels');
  dimension.approaches.forEach((approach, side) => {
    for (let i = 0; i < counts[side]; i++) {
      track.append(element('span', '', side === 0 ? 'gauge-left' : 'gauge-right'));
    }
    const label = element('span', t(approach.name) + ' ');
    label.append(element('b', t('{n}회', {n: counts[side]})));
    labels.append(label);
  });
  gauge.append(element('strong', t(dimension.name)), track, labels);
  return gauge;
}

function renderReport(answers, enter = true) {
  const gauges = [];
  const sections = dimensions.map((dimension, axis) => {
    const counts = [0, 0];
    const list = element('ul', '', 'evidence');
    for (const q of questions.filter(question => question.axis === axis)) {
      const position = answers[q.id] === 'A' ? 0 : 1;
      counts[q.reversed ? 1 - position : position]++;
      const item = element('li', '');
      item.append(element('strong', q.id + ' · ' + t(q.prompt)), t(q.options[position]));
      list.append(item);
    }
    gauges.push(renderGauge(dimension, counts));
    const approach = dimension.approaches[counts[0] > counts[1] ? 0 : 1];
    const section = element('section', '', 'metric');
    const heading = element('h4', t(dimension.name));
    heading.append(element('span', ' · ' + t(approach.name)));
    const spread = Math.max(...counts);
    const frequency = spread === 3 ? '두 방식이 3대 2로 갈렸어요.' : spread === 4 ? '다섯 상황 중 네 번 같은 방식을 골랐어요.' : '다섯 상황 모두 같은 방식을 골랐어요.';
    const details = element('details', '');
    details.append(element('summary', t('선택한 답변 5개 보기')), list);
    const tradeoffs = element('dl', '', 'tradeoffs');
    for (const [label, text] of [['강점', approach.strength], ['주의점', approach.tradeoff]]) {
      const row = element('div', '');
      row.append(element('dt', t(label)), element('dd', t(text)));
      tradeoffs.append(row);
    }
    section.append(heading, element('p', t(frequency) + ' ' + t(approach.note)), tradeoffs, details);
    return section;
  });
  byId('profile-chart').replaceChildren(...gauges);
  byId('report').replaceChildren(...sections);
  byId('results').hidden = false;
  if (enter) byId('result-title').focus();
}

byId('evaluate').addEventListener('input', () => {
  byId('results').hidden = true;
  byId('error').textContent = '';
  byId('response').removeAttribute('aria-invalid');
});
byId('evaluate').addEventListener('submit', event => {
  event.preventDefault();
  let answers;
  try {
    answers = readAnswers(byId('response').value);
  } catch (error) {
    byId('results').hidden = true;
    byId('error').textContent = error.message;
    byId('response').setAttribute('aria-invalid', 'true');
    byId('response').focus();
    return;
  }
  byId('error').textContent = '';
  byId('response').removeAttribute('aria-invalid');
  renderReport(answers);
});

document.addEventListener('quizlanguagechange', () => {
  renderQuestionnaire();
  byId('copy-status').textContent = '';
  if (!byId('results').hidden) {
    const expanded = [...byId('report').querySelectorAll('details')].map(item => item.open);
    renderReport(readAnswers(byId('response').value), false);
    byId('report').querySelectorAll('details').forEach((item, i) => { item.open = expanded[i]; });
  } else if (byId('response').hasAttribute('aria-invalid')) {
    try {
      readAnswers(byId('response').value);
    } catch (error) {
      byId('error').textContent = error.message;
    }
  }
});
