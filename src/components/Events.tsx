import React from 'react';

// Event data
const events = [
  {
    title: 'Elegant Event',
    date: '31 Jun',
    performers: 'DJ LOVE · DJ HEART · DJ KISS',
    description: 'Lorem Ipsum is simply dummy text of the printing',
  },
  {
    title: 'Summer Book Festival',
    location: 'Gozo',
    description: 'Lorem Ipsum is simply dummy text of the printing',
  },
  {
    title: 'Art Rising',
    date: 'Sat May 01 2023',
    location: 'John Street',
    description: 'Lorem Ipsum is simply dummy text of the printing',
  }
];

// Event card component
const EventCard = ({ title, subtitle, description }) => {
  const imageUrl = 'https://s3-alpha-sig.figma.com/img/0f08/05c2/28db96474fe09fe1b6444c1b4ff70a86?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UK670VPebfY4YG5cOm9O-a9unhPzeZ4PS911hSxs81oSgVO6kty4ogkIcRzbsbTsDAuFXE50n3VoZ0CB0UpOzX9RLjvtPvmc-~QT7FGPmfDKn1RWBjhftTMHdqq1r3QPi0du~6tuOPpC2k1cYS37MNXSvaIE~QHzHMZaTUHgFyd9c4rrZoZ3BO2-pt62DqNBU2VoWcGlXJVUzg6n8n2O28pVygHFMJkE66xp6gtV1fD1toystzA28YM13u0OS5ok66qrIN0enXV7lwiT1eM7xHQ6ojTMtbjC1P7TK5TzSRL5Zqp6-a7m5xCobGNNfOQ3gyibvFsOOkdB9xgprXMlXQ__';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <p className="text-gray-700 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

// Events section component
const Events = () => (
  <div className="p-8 bg-gray-100">
    <h2 className="text-2xl font-bold mb-6">Events</h2>
    <div className="flex flex-wrap gap-6 justify-between">
      {events.map((event, index) => (
        <EventCard
          key={index}
          title={event.title}
          subtitle={event.date || event.location}
          description={event.description}
        />
      ))}
    </div>
  </div>
);

export default Events;
