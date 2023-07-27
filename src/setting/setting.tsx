import styled from "styled-components";
import logoPath from "../assets/icons/16.png";
import { useCallback, useEffect, useState } from "react";

import { Stack, Button, TextField } from "@mui/material";

export const Setting = () => {
  const [openAIToken, setOpenAIToken] = useState("");
  const [interestedArea, setInterestedArea] = useState("");
  const [privateKey, setPrivatekey] = useState("");

  const save = async () => {
    await chrome.storage.local.set({
      drawords_key: {
        openAIToken: openAIToken,
        interestedArea: interestedArea,
        privateKey: privateKey,
      },
    });
  };

  const changeOpenAIToken = useCallback((newToken: string) => {
    setOpenAIToken(newToken);
  }, []);
  const changeInterestingArea = useCallback((area: string) => {
    setInterestedArea(area);
  }, []);

  const changePrivatekey = useCallback((pk: string) => {
    setPrivatekey(pk);
  }, []);

  useEffect(() => {
    chrome.storage.local.get(["drawords_key"]).then((state) => {
      const dk = state["drawords_key"];
      if (dk.interestedArea) {
        setInterestedArea(dk.interestedArea);
      }
      if (dk.openAIToken) {
        setOpenAIToken(dk.openAIToken);
      }
      if (dk.privateKey) {
        setPrivatekey(dk.privateKey);
      }
    });
  }, []);

  return (
    <Body>
      <Logo src={logoPath} />
      <Container>
        <h1>PicWords Settings</h1>
        <Stack spacing={2}>
          <h2>OpenAI API Token</h2>
          <Stack spacing={1}>
            <Subtitle>
              Required. You can find your Secret API key in your
              <a href="https://platform.openai.com/account/api-keys">
                OpenAI User settings
              </a>
            </Subtitle>

            <TextField
              type="password"
              required
              placeholder="Put your secret API token here"
              value={openAIToken}
              onChange={(e) => changeOpenAIToken(e.target.value)}
            />

            <Subtitle>
              Input your interested areas that will help to draw better pictures
            </Subtitle>

            <TextField
              type="text"
              placeholder="Interested areas"
              value={interestedArea}
              onChange={(e) => changeInterestingArea(e.target.value)}
            />

            <Subtitle>
              Imort an existing acount private key if you want
            </Subtitle>

            <TextField
              type="password"
              placeholder="Private key"
              value={privateKey}
              onChange={(e) => changePrivatekey(e.target.value)}
            />
          </Stack>
          <Button variant="contained" onClick={save}>
            Save Setting
          </Button>
        </Stack>
      </Container>
    </Body>
  );
};

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  background-color: #f7f9f9;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
`;
export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 25px;
`;
export const Container = styled.div`
  width: 600px;
  padding: 35px 25px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.span`
  font-size: 15px;
  color: #566370;

  a {
    color: #566370;
  }
`;
