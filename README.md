## js파일 설명

### `App`

빈 url이 들어왔을 때 loginToken값이 있으면 Home, 없으면 BeforeLogin 페이지로 강제 다이렉트

### `AreaSwitchBtn`

지역을 변경할 수 있는 버튼

### `AuthLayout`

loginToken에 값이 존재하지 않으면 BeforeLogin 페이지로 강제 다이렉트\
존재하면 원하는 페이지를 보여줌

### `BeforeLogin`

로그인 전 보이는 페이지

### `BottomNav`

로그인 후 보이는 하단 네비게이션 바\
부모에게 selectedNav 값을 내려받아 아이콘에 색이 들어온다.

### `ChooseOutfit`

입었던 옷 선택 페이지

### `Home`

메인 페이지

### `Modal`

재사용이 가능한 모달 창 컴포넌트

### `MyCloset`

내 옷장 페이지

### `MyClosetSub`

부모에게 category 값을 내려받아 해당 목록 출력

### `OutfitList`

착장 리스트 페이지

### `RegisterCategory`

착장 등록 페이지에 있는 옷 선택&평가 박스

### `RegisterCloset`

옷장 등록 창

### `RegisterOutfit`

착장 등록 페이지

### `Setting`

설정 페이지\
로그아웃 버튼 누를 시 loginToken 값 삭제