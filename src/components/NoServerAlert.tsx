
type Props = {
  errorMsg: string;
};
function NoServerAlert({ errorMsg }: Props) {
  const styleObj = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    fontSize:"20px",
    color:"white",
    zIndex: 1,
    paddingTop:"300px"
  } as const;
  return (
    <div id="NoServerAlert" style={styleObj}>
      <div>서버와의 연결이 끊어졌어요.</div>
      <div>Error Message : {errorMsg}</div>
    </div>
  );
}

export default NoServerAlert;
