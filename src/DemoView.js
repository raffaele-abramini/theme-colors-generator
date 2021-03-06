import React from "react";
import styled from "@emotion/styled";

const fontSize = (baseFontSize) => (p) => {
  const { baseFontSizeMultiplier: mult } = p.theme;

  function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  if (baseFontSize <= 1) {
    return baseFontSize;
  }

  const finalMultiplier = Math.min(
    (mult - 1) * Math.pow(getBaseLog(baseFontSize, 16), 2) + 1,
    mult
  );

  const a = baseFontSize * finalMultiplier + "px";

  return a;
};

const Button = styled.button`
  color: ${(p) => p.theme.colorPrimaryOpposite};
  background: ${(p) => p.theme.colorPrimary};

  &:hover {
    background: ${({ theme }) =>
      theme.isLight ? theme.colorPrimaryDark : theme.colorPrimaryLight};
    color: ${({ theme }) =>
      theme.isLight
        ? theme.colorPrimaryOppositeDark
        : theme.colorPrimaryOppositeLight};
  }
`;
const Header = styled.header`
  background: ${(p) => p.theme.colorBase20};
  height: 50px;
  display: flex;
  align-items: center;
`;
const Background = styled.section`
  color: ${(p) => p.theme.colorBase100};
  background: ${(p) => p.theme.colorBase0};
  min-height: 500px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  font-size: ${fontSize(16)};

  button {
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: ${fontSize(14)};
    cursor: pointer;
  }
`;

const Sidebar = styled.aside`
  background: ${(p) => p.theme.colorBase10};
`;
const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
`;
const SidebarItem = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${(p) => p.theme.colorBase20};
  }
`;
const SidebarToggle = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colorBase30};
  }
`;
const Logo = styled.div`
  padding: 16px;
  cursor: pointer;
`;
const WelcomeTag = styled.div`
  margin-left: auto;
  padding-right: 20px;

  *:first-of-type {
    font-size: ${fontSize(12)};
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  *:last-of-type {
    font-size: ${fontSize(10)};
    letter-spacing: 1px;
  }
`;

const AgentView = styled.div`
  display: flex;
  flex: 1;
`;
const Panel1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const Panel2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.colorBase40};
  background: ${({ theme }) => theme.colorBase10};
  width: 50%;
`;

const Label = styled.h4`
  font-size: ${fontSize(10)};
  text-transform: uppercase;
  padding-bottom: 4px;
  letter-spacing: 2px;
  border-bottom: 3px solid ${({ theme }) => theme.colorPrimary};
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 2px;
  font-size: ${fontSize(24)};
`;

const SublteText = styled.p`
  color: ${({ theme }) => theme.colorBase70};
`;

export const DemoView = ({ color, onChangeComplete, label }) => {
  return (
    <Background>
      <Header>
        <SidebarToggle>|||</SidebarToggle>
        <Logo>My Logo here</Logo>
        <WelcomeTag>
          <div>Howdy mate</div> <div>Ready to go | 1h</div>
        </WelcomeTag>
      </Header>
      <Container>
        <Sidebar>
          <SidebarItem>O</SidebarItem>
          <SidebarItem>O</SidebarItem>
          <SidebarItem>O</SidebarItem>
          <SidebarItem>O</SidebarItem>
        </Sidebar>
        <AgentView>
          <Panel1>
            <Label>Status</Label>

            <Title>No objectives</Title>

            <SublteText>Less important text here</SublteText>

            <Button type="button">Click me</Button>
          </Panel1>
          <Panel2>
            <Label>Configure here</Label>

            <Title>Configurable section</Title>
            <p>Please configure me</p>
            <Button type="button">How to configure</Button>
          </Panel2>
        </AgentView>
      </Container>
    </Background>
  );
};
