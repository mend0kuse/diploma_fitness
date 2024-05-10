import { Container, Title, Accordion } from '@mantine/core';

export function FaqSimple() {
    return (
        <Container component='section' size={'xl'}>
            <Title mb={'lg'} ta='center'>
                Часто задаваемы вопросы
            </Title>

            <Accordion styles={{ root: { width: 800 } }} variant='separated'>
                <Accordion.Item value='shape'>
                    <Accordion.Control>Нужно ли мне быть в форме, чтобы начать посещать фитнес-клуб?</Accordion.Control>
                    <Accordion.Panel>
                        Нет, наш клуб приветствует людей всех уровней подготовки. У нас есть программы и тренеры,
                        <br />
                        которые помогут вам начать с комфортным темпом и постепенно улучшать вашу физическую форму.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value='tariffs'>
                    <Accordion.Control>Какие абонементы доступны?</Accordion.Control>
                    <Accordion.Panel>
                        Мы предлагаем различные абонементы, включая месячные, полугодовые и годовые.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value='kids'>
                    <Accordion.Control>Могут ли дети посещать фитнес-центр?</Accordion.Control>
                    <Accordion.Panel>
                        Да, дети старше 12 лет могут посещать фитнес-центр в сопровождении взрослого. Для детей мы
                        предлагаем специальные молодежные программы тренировок и занятия по фитнесу, которые подходят
                        начинающим и подросткам.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value='parking'>
                    <Accordion.Control>Есть ли у вас парковка?</Accordion.Control>
                    <Accordion.Panel>
                        Да, для наших клиентов предусмотрена бесплатная парковка. Она находится рядом с фитнес-центром и
                        оснащена системой видеонаблюдения для вашей безопасности.
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
