## 컴포넌트 설명

### `App`

모든 컴포넌트를 포함\
isLoggedIn으로 `BeforeLogin`, `BottomNav + selectedNav` 중 결정\
selectedNav으로 `Main`, `MyCloset`, `OutfitList`, `Setting` 중 결정\

### `BeforeLogin`

로그인 전 보이는 페이지\
sendisLoggedIn을 통해 App(부모)의 isLoggedIn 값을 변경

### `BottomNav`

로그인 후 보이는 하단 네비게이션 바\
App(부모)에게 selectedNav 값을 내려받고, sendSelectedNav를 통해 selectedNav 값을 변경

### `Main`

메인 페이지

### `MyCloset`

내 옷장 페이지

### `OutfitList`

착장 리스트 페이지

### `Setting`

설정 페이지\
sendisLoggedIn을 통해 App(부모)의 isLoggedIn 값을 변경