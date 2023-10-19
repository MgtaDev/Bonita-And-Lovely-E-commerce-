import React from 'react';
import styled from 'styled-components'; // Importa Styled Components
import GithubLogo from './assets/github.png'
import LinkedinLogo from './assets/linkedin.png'
import GmailLogo from './assets/gmail.png'
import code from './assets/Code.png'
import Dani from './assets/DaniDev.jpeg'
import Iveth from './assets/IvethDev.jpeg'
import Nahuel from './assets/NahuelDev.png'
import Nat from './assets/NatDev.jpeg'
import Esteban from './assets/EstebanDev.png'


let imageLink =
    'https://media.istockphoto.com/id/1337144146/es/vector/vector-de-icono-de-perfil-de-avatar-predeterminado.jpg?s=612x612&w=0&k=20&c=YiNB64vwYQnKqp-bWd5mB_9QARD3tSpIosg-3kuQ_CI=';


const ContainerTeam = styled.div`
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const DevContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px; /* Ajusta el valor según tus preferencias */
`;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const CardTitle = styled.h3`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  opacity: 60%;
  line-height: normal;
//   margin-left:5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.20);
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 300px;
  height: 300px;
  margin: 2%;
  padding: 1.5%;

  &:hover {
    transition:.5s;
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
`;


const DevImg = styled.img`
width:150px;
height:300px;
border-radius:50%;
margin-bottom:.5rem;
`

const H1 = styled.h1`
font-weight:600;
margin-left:1%;
text-align:center;
font-size:32px;
opacity:80%;
margin-top:3%
`

const ButtonsDiv = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
margin-top:-3%
`
const PinkButton = styled.button`
background-color: rgb(238, 202, 250);
padding:.5rem;
border-radius:50%;
`
const SocialsDiv = styled.div`
display: flex;
margin-left:5rem;
background-color: rgb(209,228,247);
border-radius:20%;
width:150px;
`
const Github = styled.img`
width:70px;
margin:2%;
&:hover {
    transition:.5s;
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
cursor:pointer;
`
const Linkedin = styled.img`
width:70px;
margin:2%;
&:hover {
    transition:.5s;
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
cursor:pointer;
`
const Gmail = styled.img`
width:70px;
margin:2%;
&:hover {
    transition:.5s;
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
cursor:pointer;
`
const Link = styled.a`
margin:.6rem
`
const Code = styled.img`
width:40px;
filter:invert(100%);
`
const Subtitle = styled.h2`
font-weight:600;
text-align:center;
font-size:22px;

opacity:40%;
text-align:center;
`

const Reviews = () => {
  return (
    <>
    <H1>Nuestro Dev Team</H1>
    <Subtitle>Conoce al equipo encargado de desarrollar esta tienda online!</Subtitle>
    <ContainerTeam>
        

    {/* Iveth */}

   {/* Nat
   <Card>

<ButtonsDiv>
<PinkButton>
<Code src={code} alt='icon'></Code>
</PinkButton>

    <SocialsDiv>
<Link target='_blank' href='https://github.com/natisalvarez'>
<Github src={GithubLogo}></Github>
</Link>

<Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
<Linkedin src={LinkedinLogo}></Linkedin>
</Link>

<Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
<Gmail src={GmailLogo}></Gmail>
</Link>
</SocialsDiv>
</ButtonsDiv>
<DevImg src={Nat} alt='Paul-img'></DevImg>
     
      <DevContainer>
          <AvatarImage src={imageLink} alt="user avatar" />
          <CardTitle>Natalia Alvarez</CardTitle>
      </DevContainer>
</Card> */}

    <Card>

<ButtonsDiv>
<PinkButton>
        <Code src={code} alt='icon'></Code>
    </PinkButton>

    <SocialsDiv>
        <Link target='_blank' href='https://github.com/ivethglez80/ivethglez80'>
        <Github src={GithubLogo}></Github>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
        <Linkedin src={LinkedinLogo}></Linkedin>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
        <Gmail src={GmailLogo}></Gmail>
        </Link>
    </SocialsDiv>
</ButtonsDiv>
<DevImg src={Iveth} alt='Paul-img'></DevImg>
     
      <DevContainer>
          <AvatarImage src={imageLink} alt="user avatar" />
          <CardTitle>Iveth Gonzales</CardTitle>
      </DevContainer>
    </Card>

    {/*Nahuel  */}
    <Card>

<ButtonsDiv>
<PinkButton>
        <Code src={code} alt='icon'></Code>
    </PinkButton>

    <SocialsDiv>
        <Link target='_blank' href='https://github.com/abernix102'>
        <Github src={GithubLogo}></Github>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/nahuel-ordo%C3%B1ez13/'>
        <Linkedin src={LinkedinLogo}></Linkedin>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
        <Gmail src={GmailLogo}></Gmail>
        </Link>
    </SocialsDiv>
</ButtonsDiv>
<DevImg src={Nahuel} alt='Paul-img'></DevImg>
     
      <DevContainer>
          <AvatarImage src={imageLink} alt="user avatar" />
          <CardTitle>Nahuel Ordoñes</CardTitle>
      </DevContainer>
    </Card>

    {/* Esteban */}
    <Card>

<ButtonsDiv>
    <PinkButton>
        <Code src={code} alt='icon'></Code>
    </PinkButton>
    <SocialsDiv>
        <Link target='_blank' href='https://github.com/brandonlopez98'>
        <Github src={GithubLogo}></Github>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
        <Linkedin src={LinkedinLogo}></Linkedin>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
        <Gmail src={GmailLogo}></Gmail>
        </Link>
    </SocialsDiv>
</ButtonsDiv>
<DevImg src={Esteban} alt='Paul-img'></DevImg>
     
      <DevContainer>
          <AvatarImage src={imageLink} alt="user avatar" />
          <CardTitle>Esteban Lopez.</CardTitle>
      </DevContainer>
    </Card>

 
    {/* Daniel */}
    <Card>

<ButtonsDiv>
<PinkButton>
        <Code src={code} alt='icon'></Code>
    </PinkButton>
    <SocialsDiv>
        <Link target='_blank' href='https://github.com/MgtaDev'>
        <Github src={GithubLogo}></Github>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/daniel-passantino-9a6975269/'>
        <Linkedin src={LinkedinLogo}></Linkedin>
        </Link>

        <Link target='_blank' href='https://www.linkedin.com/in/iveth-gonzalez-98799895/'>
        <Gmail src={GmailLogo}></Gmail>
        </Link>
    </SocialsDiv>
</ButtonsDiv>
<DevImg src={Dani} alt='Paul-img'></DevImg>
     
      <DevContainer>
          <AvatarImage src={imageLink} alt="user avatar" />
          <CardTitle>Daniel Passantino</CardTitle>
      </DevContainer>
    </Card>

</ContainerTeam>
      </>
  );
};

export default Reviews;