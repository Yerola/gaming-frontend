import ChatBot from 'react-simple-chatbot';
import  { ThemeProvider } from 'styled-components'; 
import { useRouter } from "next/router"; 
import styles from "./Chatbot.module.scss";

export function ChatbotGaming() {

const router = useRouter();

const steps = [
  {
    id: '1',
    message: '¡Bienvenido a Gaming, el mejor e-commerce de videojuegos! ¿En qué puedo ayudarte?',
    trigger: '2'
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Quiero ver juegos disponibles', trigger: '3' },
      { value: 2, label: 'Quiero ver juegos con descuentos', trigger: '4' },
      { value: 3, label: '¿Cómo puedo realizar una compra?', trigger: '5'},
      { value: 4, label: 'Quisiera contactarme con atención al cliente', trigger: '6' },
      { value: 5, label: 'Quisiera eliminar mi cuenta', trigger: '10' },
    ],
  },
  {
    id: '3',
    message: 'Claro. Aguarda unos instantes, te redirigiremos.',
    trigger: () => router.push('http://localhost:3000'),
  },
  {
    id: '4',
    message: 'Claro. Aguarda unos instantes, te redirigiremos.',
    trigger: () => router.push('http://localhost:3000/search?s=&d=true'),
  },
  {
    id: '5',
    message: 'Para comprar un juego en nuestra tienda, sigue los siguientes pasos: 1. Selecciona el juego que te interesa. 2. Añade el juego a tu carrito de compras. 3. Revisa la información de tu pedido y completa tus datos de pago. 4. Haz clic en "Comprar" y ¡listo!',
    trigger: '7'
  },
  {
    id: '6',
    message: 'Para contactar con atención al cliente, por favor envía un correo electrónico a support@gaming.com o llámanos al (+34)661626007.',
    trigger: '7'
  },
  {
    id: '10',
    message: 'Para eliminar tu cuenta, por favor envía un correo electrónico a support@gaming.com con el asunto "Cancelación de cuenta" o llámanos al (+34)661626007',
    trigger: '7'
  },
  {
    id: '7',
    message: 'Deseas realizar otra consulta?',
    trigger: '8',
  },
  {
    id: '8',
    options: [
      {value: 5, label: 'Sí', trigger: '2'},
      {value: 6, label: 'No', trigger: '9'},
    ]
  },
  {
    id: '9',
    message: 'Gracias por tu consulta!',
    end: true,
  }

];


const theme = {
  background: '#272727',
  headerBgColor: '#ff5400',
  headerFontSize: '20px',
  botBubbleColor: '#3d3d3d',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#ff5400',
  userFontColor: 'white', 
};

const chatbotStyle = `
    .rsc-os-option-element {
      font-family: 'Lato';
    }
  `;


    return (
      <div className= {styles.custombubble}>
        <style>{chatbotStyle}</style>
        <ThemeProvider theme={theme}>
            <ChatBot
            headerTitle="Asistente Virtual"
            steps={steps}
            floating= {true}
            inputStyle={{ display: 'none' }}
            hideSubmitButton = {true}
            width= "330px"
            height= "440px"
            />
        </ThemeProvider>
      </div>
    );
  };
