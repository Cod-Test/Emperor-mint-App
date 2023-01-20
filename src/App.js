import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [process, setProcess] = useState(false);
  const [feedback, setFeedback] = useState(`Conneted to Web3.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SCAN: "",
    SCANB: "",
    MARKET: "",
    HANDLE: "",
    TUTOR: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    SCAN_LINKB: "",
    MARKETPLACE_LINK: "",
    MARKET_LINK: "",
    HANDLE_LINK: "",
    MAIL_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const UnstakeEmperor = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Unstake processing...`);
    setProcess(true);
    blockchain.smartContract.methods
      .unstake(blockchain.account)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, Unstake failed ❌");
        setProcess(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congrats! Unstake successful ✔️`
        );
        setProcess(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const ExitPool = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Exit processing...`);
    setProcess(true);
    blockchain.smartContract.methods
      .exitPool(blockchain.account)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, Exit failed ❌");
        setProcess(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congrats! Exit successful ✔️`
        );
        setProcess(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const StakeEmperor = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Stake processing...`);
    setProcess(true);
    blockchain.smartContract.methods
      .stake()
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, Stake failed ❌");
        setProcess(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congrats! Stake successful ✔️`
        );
        setProcess(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const JoinPool = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Join processing...`);
    setProcess(true);
    blockchain.smartContract.methods
      .joinPool()
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, Join failed ❌");
        setProcess(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congrats! Join successful ✔️`
        );
        setProcess(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <a href={CONFIG.MAIL_LINK}>
          <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        </a>
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={"/config/images/example.gif"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data._stakes}
            </s.TextTitle>
            <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        TOTAL STAKE
                      </s.TextDescription>
            <s.SpacerSmall />
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.SCAN, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            <StyledLink target={"_blank"} href={CONFIG.SCAN_LINKB}>
              {CONFIG.SCANB}
            </StyledLink>
            <s.SpacerSmall />
            <span
              style={{
                textAlign: "center",
              }}
            >
              <StyledButton
                onClick={(e) => {
                  window.open("/config/EmperorWhitePaper.pdf", "_blank");
                }}
                style={{
                  margin: "5px",
                }}
              >
                W/Paper1
              </StyledButton>
              <StyledButton
                onClick={(e) => {
                  window.open("/config/EmperorWhitePaper.pdf", "_blank");
                }}
                style={{
                  margin: "5px",
                }}
              >
                W/Paper2
              </StyledButton>
            </span>
            <s.SpacerSmall />
            <StyledButton
                style={{
                  margin: "5px",
                }}
                onClick={(e) => {
                  window.open(CONFIG.MARKETPLACE_LINK, "_blank");
                }}
              >
                {CONFIG.MARKETPLACE}
              </StyledButton>
            <s.SpacerSmall />
            <StyledLink target={"_blank"} href={"/config/EmperorwhitePaper.pdf"}>
              {CONFIG.TUTOR}
            </StyledLink>
            <s.SpacerSmall />
            {Number(data._stakes) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} in their
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKET_LINK}>
                  {CONFIG.MARKET}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  EMPEROR YIELD STAKING
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  20,000 {CONFIG.SYMBOL} tokens for staking, 500 tokens for Pool.
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                      <StyledButton
                        style={{ lineHeight: 0.4 }}
                        disabled={process ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          JoinPool();
                          getData();
                        }}
                      >
                        JOINPOOL
                      </StyledButton>
                      <s.SpacerMedium />
                      <StyledButton
                        style={{ lineHeight: 0.4 }}
                        disabled={process ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          ExitPool();
                          getData();
                        }}
                      >
                        EXITPOOL
                      </StyledButton>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        ⛓️
                      </s.TextDescription>
                    <s.SpacerSmall />
                      <StyledButton
                        style={{ lineHeight: 0.4 }}
                        disabled={process ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          StakeEmperor();
                          getData();
                        }}
                      >
                        STAKE
                      </StyledButton>
                      <s.SpacerMedium />
                      <StyledButton
                        style={{ lineHeight: 0.4 }}
                        disabled={process ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          UnstakeEmperor();
                          getData();
                        }}
                      >
                        {process ? "⚡" : "UNSTAKE"}
                      </StyledButton>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"/config/images/example.gif"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
        <s.Container ai={"center"} jc={"center"} fd={"row"}>
        <StyledRoundButton 
          onClick={(e) => {
            window.open(CONFIG.HANDLE_LINK, "_blank");
          }}
        >
          🐦
        </StyledRoundButton>
        <s.SpacerSmall />
        <StyledRoundButton 
          onClick={(e) => {
            window.open(CONFIG.HANDLE_LINK, "_blank");
          }}
        >
          🦄
        </StyledRoundButton>
        </s.Container>
        <s.SpacerSmall />
        <StyledButton 
          onClick={(e) => {
            window.open(CONFIG.MARKET_LINK, "_blank");
          }}
        >
          {CONFIG.MARKET}
        </StyledButton>
        <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and with a funded wallet.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully execute your operations.
            For Contract address, source code and functions, please click the CONTRACT button above.
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
