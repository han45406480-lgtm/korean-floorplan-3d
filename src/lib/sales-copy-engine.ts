import { FloorplanTemplate } from '../types/floorplan';

export function generate50sSalesCopy(
  projectName: string,
  template: FloorplanTemplate,
  agentName: string = '한팀장',
  agentPhone: string = '010-0000-0000'
): string {
  return `[${projectName} ${template.name} 실적 1위 영업부장 브리핑]

"제가 이 바닥 빠이쁘 묻힐 때부터 30년 동안 모델하우스 밥 먹으면서 전국 팔도 아파트는 다 털어본 원조 멤바입니다. 웬만한 현장 봐서는 동공에 지진도 안 나는 사람인데, 여긴 문 열고 들어가자마자 가슴팍이 뻥 뚫리는 게 거의 태평양 한가운데서 윈드서핑 타는 기분이더라고요!

${template.id}타입 거실 폭이 ${template.dimensions.livingRoomWidth}입니다. 여기서 조기축구회 족구 시합을 해도 벽에 공이 안 닿을 개방감이고, 안방(${template.dimensions.masterBedroom}) 드레스룸은 옷 집어넣다 보면 거의 나르니아 연대기 마법 옷장 수준이라 길 잃어버릴 판입니다. 목젖으로 타종 좀 치는 제가 봐도 평면도 그립감이 예술이에요.

${template.keyMarketingPoint}

주변 구축들 보세요. 걔들은 이미 갑상선 다 쉬어서 힘도 못 쓰는데, 이 단지는 신설 교통 호재가 내 집 앞으로 깜빡이도 안 켜고 직진으로 훅 치고 들어옵니다. 거기다 계약조건 파격 혜택까지 더해지니, 이건 30년 장사꾼 눈으로 봐도 편의점 삼각김밥 값 내고 특급 호텔 뷔페 무제한으로 털어먹는 꼴 아닙니까?

망설이다가 잔여 로열층 다 뺏기고 나중에 피눈물 흘리면서 안구에 와이퍼 달지 마세요. 냄비 뚜껑 닫히기 직전이니까 30년 베테랑 말 믿고 지금 바로 전화해서 숟가락부터 얹으세요!

📞 로열동·호수 담당 직통: ${agentPhone} (${agentName} 부장)
※ 모델하우스 방문 전 사전예약 필수`;
}
