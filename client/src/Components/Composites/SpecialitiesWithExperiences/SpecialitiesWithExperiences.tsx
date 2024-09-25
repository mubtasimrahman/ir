import OurSpecialities from '../../OurSpecialities/OurSpecialities';
import ClientExperiences from '../../ClientExperiences/ClientExperiences';
import "./SpecialitiesWithExperiences.scss"

const SpecialitiesWithExperiences = () => {
  return (
    <div className="container-fluid color-burns-combined">
      <OurSpecialities id="Specialities" />
      <ClientExperiences id="ClientExperiences" />
    </div>
  );
};

export default SpecialitiesWithExperiences;
