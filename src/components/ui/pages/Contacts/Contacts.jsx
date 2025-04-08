import { useRef, useEffect, useState } from "react";

import { Container, Title, Text, Stack, Card, List, Loader } from "@mantine/core";
import { IconMapPin, IconPhone, IconMail, IconClock } from "@tabler/icons-react";

import { LoadScript, GoogleMap } from "@react-google-maps/api";

import styles from "./Contacts.module.scss";

export default function Contacts() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const center = {
    lat: 42.510962,
    lng: 27.458729,
  };

  const contactInfo = [
    { icon: <IconMapPin size={20} />, text: "6 Dame Gruev Street, Burgas, Bulgaria" },
    { icon: <IconPhone size={20} />, text: "+359 123 456 789" },
    { icon: <IconMail size={20} />, text: "rado@abv.bg" },
    {
      icon: <IconClock size={20} />,
      text: (
        <>
          <Text>Mon-Fri: 9:00 AM - 6:00 PM</Text>
          <Text>Sat: 10:00 AM - 2:00 PM</Text>
          <Text>Sun: Closed</Text>
        </>
      ),
    },
  ];

  const handleApiLoaded = (map) => {
    if (mapRef.current) return;
    mapRef.current = map;

    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: center,
        title: "Our Location",
      });
      setMapLoaded(true);
    }
  };

  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, []);

  return (
    <Container size="xl" className={styles.container}>
      <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
        Contact Us
      </Title>

      <Stack spacing="xl">
        <Card shadow="sm" p="lg" radius="0">
          <Title order={5} mb="md" fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
            Our Location
          </Title>
          <LoadScript
            googleMapsApiKey="AIzaSyDg9qZpNJziLFvImJgKjr2-7Dguhsc29p8"
            libraries={["marker"]}
            loadingElement={<Loader size="xl" variant="dots" />}
            mapIds={["c371713879d22443"]} // Add your Map ID here
          >
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              center={center}
              zoom={15}
              onLoad={handleApiLoaded}
              mapId="c371713879d22443"
              options={{
                mapId: "c371713879d22443",
                disableDefaultUI: false,
                clickableIcons: true,
              }}
            />
          </LoadScript>
          {!mapLoaded && (
            <Text color="dimmed" size="sm" mt="sm">
              Loading map...
            </Text>
          )}{" "}
        </Card>

        <Card shadow="sm" p="lg" radius="0">
          <Title order={5} mb="md" fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
            Contact Information
          </Title>

          <List spacing="xs" size="sm" center>
            {contactInfo.map((item, index) => (
              <List.Item key={index} icon={item.icon}>
                {item.text}
              </List.Item>
            ))}
          </List>
        </Card>

        <Card shadow="sm" p="lg" radius="0">
          <Title order={5} mb="md" fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
            Get In Touch
          </Title>
          <Text>
            Have questions or feedback? We would love to hear from you! Our team is available during business hours to
            assist with any inquiries.
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}
