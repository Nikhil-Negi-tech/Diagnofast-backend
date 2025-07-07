// Sample data for testing the application
// Run this script to populate your database with sample diseases and medicines

const mongoose = require('mongoose');
const Disease = require('./models/Disease');
const Medicine = require('./models/Medicine');
const Admin = require('./models/Admin');
require('dotenv').config();

const sampleDiseases = [
  // Respiratory Diseases
  {
    name: 'Common Cold',
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'mild cough', 'low-grade fever', 'nasal congestion'],
    description: 'A viral infection of the upper respiratory tract that is very common and usually harmless.'
  },
  {
    name: 'Influenza (Flu)',
    symptoms: ['high fever', 'body aches', 'severe fatigue', 'headache', 'dry cough', 'chills', 'sore throat'],
    description: 'A viral infection that attacks the respiratory system and can cause severe complications.'
  },
  {
    name: 'Pneumonia',
    symptoms: ['persistent cough with phlegm', 'fever', 'chest pain when breathing', 'difficulty breathing', 'fatigue', 'chills'],
    description: 'An infection that inflames air sacs in one or both lungs, which may fill with fluid.'
  },
  {
    name: 'Asthma',
    symptoms: ['wheezing', 'shortness of breath', 'chest tightness', 'persistent cough', 'difficulty sleeping due to breathing'],
    description: 'A condition in which airways narrow and swell, making breathing difficult.'
  },
  {
    name: 'Bronchitis',
    symptoms: ['persistent cough with mucus', 'fatigue', 'shortness of breath', 'chest discomfort', 'low-grade fever'],
    description: 'Inflammation of the bronchial tubes that carry air to the lungs.'
  },
  {
    name: 'Tuberculosis',
    symptoms: ['persistent cough lasting weeks', 'coughing up blood', 'weight loss', 'night sweats', 'fever', 'loss of appetite'],
    description: 'A serious bacterial infection that mainly affects the lungs.'
  },
  {
    name: 'Whooping Cough',
    symptoms: ['violent coughing fits', 'whooping sound when breathing', 'vomiting after coughing', 'exhaustion', 'runny nose'],
    description: 'A highly contagious bacterial infection affecting the respiratory system.'
  },
  {
    name: 'Sinusitis',
    symptoms: ['facial pain and pressure', 'nasal congestion', 'thick yellow or green nasal discharge', 'headache', 'reduced sense of smell'],
    description: 'Inflammation of the sinuses causing congestion and facial pain.'
  },

  // Cardiovascular Diseases
  {
    name: 'Hypertension',
    symptoms: ['often no symptoms', 'headache', 'dizziness', 'blurred vision', 'shortness of breath'],
    description: 'High blood pressure that increases the risk of heart disease and stroke.'
  },
  {
    name: 'Heart Attack',
    symptoms: ['severe chest pain', 'pain radiating to arm or jaw', 'shortness of breath', 'nausea', 'sweating', 'lightheadedness'],
    description: 'A blockage of blood flow to the heart muscle.'
  },
  {
    name: 'Angina',
    symptoms: ['chest pain or discomfort', 'pressure in chest', 'shortness of breath', 'fatigue', 'pain in shoulders or arms'],
    description: 'Chest pain caused by reduced blood flow to the heart muscles.'
  },
  {
    name: 'Arrhythmia',
    symptoms: ['irregular heartbeat', 'heart palpitations', 'dizziness', 'chest pain', 'shortness of breath', 'fainting'],
    description: 'Abnormal heart rhythm that can be too fast, too slow, or irregular.'
  },

  // Gastrointestinal Diseases
  {
    name: 'Gastroenteritis',
    symptoms: ['diarrhea', 'vomiting', 'stomach pain', 'fever', 'dehydration'],
    description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infection.'
  },
  {
    name: 'Gastric Ulcer',
    symptoms: ['stomach pain', 'bloating', 'heartburn', 'nausea', 'loss of appetite'],
    description: 'Open sores in the lining of the stomach caused by bacteria or medications.'
  },
  {
    name: 'Irritable Bowel Syndrome',
    symptoms: ['abdominal pain', 'bloating', 'diarrhea', 'constipation', 'gas'],
    description: 'A common disorder affecting the large intestine with cramping and bowel changes.'
  },
  {
    name: 'Appendicitis',
    symptoms: ['severe abdominal pain', 'nausea', 'vomiting', 'fever', 'loss of appetite'],
    description: 'Inflammation of the appendix requiring immediate medical attention.'
  },
  {
    name: 'Gallstones',
    symptoms: ['severe abdominal pain', 'nausea', 'vomiting', 'fever', 'jaundice'],
    description: 'Hard deposits in the gallbladder that can cause severe pain.'
  },
  {
    name: 'Hepatitis',
    symptoms: ['fatigue', 'nausea', 'abdominal pain', 'dark urine', 'jaundice'],
    description: 'Inflammation of the liver, often caused by viral infection.'
  },

  // Infectious Diseases
  {
    name: 'Malaria',
    symptoms: ['fever', 'chills', 'sweating', 'headache', 'nausea', 'vomiting', 'fatigue'],
    description: 'A disease caused by a plasmodium parasite, transmitted by infected mosquitoes.'
  },
  {
    name: 'Dengue Fever',
    symptoms: ['high fever', 'severe headache', 'muscle pain', 'rash', 'nausea'],
    description: 'A mosquito-borne viral infection causing flu-like symptoms.'
  },
  {
    name: 'Typhoid',
    symptoms: ['prolonged fever', 'headache', 'weakness', 'stomach pain', 'rash'],
    description: 'A bacterial infection spread through contaminated food and water.'
  },
  {
    name: 'Chickenpox',
    symptoms: ['itchy rash', 'fever', 'headache', 'fatigue', 'loss of appetite'],
    description: 'A highly contagious viral infection causing an itchy rash and fever.'
  },
  {
    name: 'Measles',
    symptoms: ['high fever', 'cough', 'runny nose', 'red eyes', 'rash'],
    description: 'A highly contagious viral infection with characteristic rash.'
  },
  {
    name: 'Mumps',
    symptoms: ['swollen salivary glands', 'fever', 'headache', 'muscle aches', 'fatigue'],
    description: 'A viral infection causing swelling of the salivary glands.'
  },

  // Neurological Disorders
  {
    name: 'Migraine',
    symptoms: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light', 'visual disturbances'],
    description: 'A type of headache characterized by severe pain and other debilitating symptoms.'
  },
  {
    name: 'Epilepsy',
    symptoms: ['seizures', 'confusion', 'staring spells', 'muscle jerks', 'loss of consciousness'],
    description: 'A neurological disorder characterized by recurrent seizures.'
  },
  {
    name: 'Stroke',
    symptoms: ['sudden weakness', 'facial drooping', 'speech difficulty', 'confusion', 'severe headache'],
    description: 'A serious condition when blood supply to the brain is interrupted.'
  },
  {
    name: 'Alzheimer\'s Disease',
    symptoms: ['memory loss', 'confusion', 'difficulty thinking', 'behavior changes', 'language problems'],
    description: 'A progressive brain disorder affecting memory and cognitive function.'
  },
  {
    name: 'Parkinson\'s Disease',
    symptoms: ['tremors', 'stiffness', 'slow movement', 'balance problems', 'speech changes'],
    description: 'A progressive nervous system disorder affecting movement.'
  },

  // Endocrine Disorders
  {
    name: 'Diabetes Type 1',
    symptoms: ['excessive thirst', 'frequent urination', 'extreme hunger', 'weight loss', 'fatigue'],
    description: 'An autoimmune condition where the pancreas produces little or no insulin.'
  },
  {
    name: 'Diabetes Type 2',
    symptoms: ['excessive thirst', 'frequent urination', 'unexplained weight loss', 'fatigue', 'blurred vision'],
    description: 'A chronic condition affecting how the body processes blood sugar (glucose).'
  },
  {
    name: 'Hyperthyroidism',
    symptoms: ['weight loss', 'rapid heartbeat', 'nervousness', 'sweating', 'fatigue'],
    description: 'Overactive thyroid gland producing too much thyroid hormone.'
  },
  {
    name: 'Hypothyroidism',
    symptoms: ['fatigue', 'weight gain', 'cold sensitivity', 'dry skin', 'hair loss'],
    description: 'Underactive thyroid gland not producing enough thyroid hormone.'
  },

  // Mental Health Disorders
  {
    name: 'Anxiety Disorder',
    symptoms: ['excessive worry', 'restlessness', 'fatigue', 'difficulty concentrating', 'muscle tension'],
    description: 'A mental health condition characterized by excessive, persistent worry and fear.'
  },
  {
    name: 'Depression',
    symptoms: ['persistent sadness', 'loss of interest', 'fatigue', 'sleep disturbances', 'appetite changes'],
    description: 'A mood disorder causing persistent feelings of sadness and loss of interest.'
  },
  {
    name: 'Bipolar Disorder',
    symptoms: ['mood swings', 'manic episodes', 'depression', 'energy changes', 'sleep disturbances'],
    description: 'A mental health condition characterized by extreme mood swings.'
  },
  {
    name: 'Panic Disorder',
    symptoms: ['panic attacks', 'rapid heartbeat', 'sweating', 'trembling', 'fear of dying'],
    description: 'A type of anxiety disorder characterized by recurring panic attacks.'
  },

  // Skin Conditions
  {
    name: 'Eczema',
    symptoms: ['itchy skin', 'red patches', 'dry skin', 'rash', 'skin thickening'],
    description: 'A condition causing inflamed, itchy, cracked, and rough skin patches.'
  },
  {
    name: 'Psoriasis',
    symptoms: ['red patches', 'silvery scales', 'itching', 'burning', 'dry skin'],
    description: 'An autoimmune condition causing rapid skin cell buildup.'
  },
  {
    name: 'Acne',
    symptoms: ['pimples', 'blackheads', 'whiteheads', 'oily skin', 'scarring'],
    description: 'A skin condition causing spots and pimples, especially on face and shoulders.'
  },
  {
    name: 'Fungal Infection',
    symptoms: ['itching', 'redness', 'scaling', 'burning sensation', 'odor'],
    description: 'Infection caused by fungi affecting skin, nails, or hair.'
  },

  // Musculoskeletal Disorders
  {
    name: 'Arthritis',
    symptoms: ['joint pain', 'stiffness', 'swelling', 'reduced range of motion', 'fatigue'],
    description: 'Inflammation of joints causing pain and stiffness.'
  },
  {
    name: 'Osteoporosis',
    symptoms: ['bone fractures', 'back pain', 'loss of height', 'stooped posture'],
    description: 'A condition causing bones to become weak and brittle.'
  },
  {
    name: 'Fibromyalgia',
    symptoms: ['widespread pain', 'fatigue', 'sleep disturbances', 'memory problems', 'mood issues'],
    description: 'A disorder characterized by widespread musculoskeletal pain.'
  },
  {
    name: 'Gout',
    symptoms: ['severe joint pain', 'swelling', 'redness', 'tenderness', 'limited range of motion'],
    description: 'A form of arthritis caused by excess uric acid in the blood.'
  },

  // Eye Conditions
  {
    name: 'Conjunctivitis',
    symptoms: ['red eyes', 'itching', 'discharge', 'tearing', 'gritty feeling'],
    description: 'Inflammation of the conjunctiva causing red, itchy eyes.'
  },
  {
    name: 'Glaucoma',
    symptoms: ['gradual vision loss', 'eye pain', 'nausea', 'blurred vision', 'halos around lights'],
    description: 'A group of eye conditions damaging the optic nerve.'
  },
  {
    name: 'Cataracts',
    symptoms: ['cloudy vision', 'difficulty seeing at night', 'sensitivity to light', 'halos around lights'],
    description: 'Clouding of the normally clear lens of the eye.'
  },

  // Ear Conditions
  {
    name: 'Ear Infection',
    symptoms: ['ear pain', 'hearing difficulty', 'ear discharge', 'fever', 'headache'],
    description: 'Bacterial or viral infection of the middle or outer ear.'
  },
  {
    name: 'Tinnitus',
    symptoms: ['ringing in ears', 'buzzing sound', 'hearing loss', 'dizziness'],
    description: 'Perception of noise or ringing in the ears when no external sound is present.'
  },

  // Kidney and Urinary Disorders
  {
    name: 'Kidney Stones',
    symptoms: ['severe pain', 'nausea', 'vomiting', 'blood in urine', 'frequent urination'],
    description: 'Hard deposits made of minerals and salts that form inside kidneys.'
  },
  {
    name: 'Urinary Tract Infection',
    symptoms: ['burning urination', 'frequent urination', 'cloudy urine', 'pelvic pain', 'strong urine odor'],
    description: 'Infection in any part of the urinary system.'
  },
  {
    name: 'Chronic Kidney Disease',
    symptoms: ['fatigue', 'swelling', 'shortness of breath', 'nausea', 'confusion'],
    description: 'Gradual loss of kidney function over time.'
  },

  // Blood Disorders
  {
    name: 'Anemia',
    symptoms: ['fatigue', 'weakness', 'pale skin', 'shortness of breath', 'dizziness'],
    description: 'A condition where blood lacks adequate healthy red blood cells.'
  },
  {
    name: 'Leukemia',
    symptoms: ['fatigue', 'frequent infections', 'easy bruising', 'weight loss', 'swollen lymph nodes'],
    description: 'Cancer of blood-forming tissues including bone marrow.'
  },

  // Reproductive Health
  {
    name: 'Polycystic Ovary Syndrome',
    symptoms: ['irregular periods', 'excess hair growth', 'acne', 'weight gain', 'hair loss'],
    description: 'A hormonal disorder common among women of reproductive age.'
  },
  {
    name: 'Endometriosis',
    symptoms: ['pelvic pain', 'painful periods', 'pain during intercourse', 'infertility', 'fatigue'],
    description: 'A condition where tissue similar to uterine lining grows outside the uterus.'
  },

  // Autoimmune Disorders
  {
    name: 'Rheumatoid Arthritis',
    symptoms: ['joint pain', 'swelling', 'morning stiffness', 'fatigue', 'fever'],
    description: 'An autoimmune disorder primarily affecting joints.'
  },
  {
    name: 'Lupus',
    symptoms: ['fatigue', 'joint pain', 'rash', 'fever', 'weight loss'],
    description: 'An autoimmune disease where the immune system attacks healthy tissue.'
  },
  {
    name: 'Multiple Sclerosis',
    symptoms: ['fatigue', 'difficulty walking', 'numbness', 'muscle weakness', 'vision problems'],
    description: 'A disease affecting the central nervous system.'
  },

  // Allergic Conditions
  {
    name: 'Allergic Rhinitis',
    symptoms: ['sneezing', 'runny nose', 'itchy eyes', 'nasal congestion', 'post-nasal drip'],
    description: 'An allergic response causing cold-like symptoms.'
  },
  {
    name: 'Food Allergies',
    symptoms: ['hives', 'swelling', 'difficulty breathing', 'nausea', 'diarrhea'],
    description: 'Immune system reaction to certain foods.'
  },

  // Sleep Disorders
  {
    name: 'Sleep Apnea',
    symptoms: ['loud snoring', 'gasping during sleep', 'excessive daytime sleepiness', 'morning headache'],
    description: 'A serious sleep disorder where breathing repeatedly stops and starts.'
  },
  {
    name: 'Insomnia',
    symptoms: ['difficulty falling asleep', 'frequent waking', 'daytime fatigue', 'irritability'],
    description: 'A sleep disorder characterized by difficulty falling or staying asleep.'
  },

  // Cancer Types
  {
    name: 'Lung Cancer',
    symptoms: ['persistent cough', 'chest pain', 'shortness of breath', 'weight loss', 'fatigue'],
    description: 'Cancer that begins in the lungs and may spread to other parts of the body.'
  },
  {
    name: 'Breast Cancer',
    symptoms: ['breast lump', 'breast pain', 'skin changes', 'nipple discharge', 'swelling'],
    description: 'Cancer that forms in the cells of the breasts.'
  },
  {
    name: 'Colorectal Cancer',
    symptoms: ['changes in bowel habits', 'blood in stool', 'abdominal pain', 'weight loss', 'fatigue'],
    description: 'Cancer of the colon or rectum, located at the digestive tract\'s lower end.'
  },

  // Metabolic Disorders
  {
    name: 'Obesity',
    symptoms: ['excessive weight gain', 'fatigue', 'joint pain', 'sleep problems', 'depression'],
    description: 'A complex disorder involving excessive amount of body fat.'
  },
  {
    name: 'Metabolic Syndrome',
    symptoms: ['large waist circumference', 'high blood pressure', 'high blood sugar', 'abnormal cholesterol'],
    description: 'A cluster of conditions that increase risk of heart disease and diabetes.'
  },

  // Additional Common Conditions
  {
    name: 'Vertigo',
    symptoms: ['dizziness', 'spinning sensation', 'nausea', 'headache', 'sweating'],
    description: 'A sensation of feeling off balance, often caused by inner ear problems.'
  },
  {
    name: 'Bell\'s Palsy',
    symptoms: ['facial weakness', 'drooping mouth', 'difficulty closing eye', 'drooling', 'loss of taste'],
    description: 'Sudden weakness in facial muscles on one side of the face.'
  },
  {
    name: 'Carpal Tunnel Syndrome',
    symptoms: ['hand numbness', 'tingling', 'weakness', 'pain in wrist', 'difficulty gripping'],
    description: 'Pressure on the median nerve in the wrist causing hand and arm symptoms.'
  },
  {
    name: 'Sciatica',
    symptoms: ['lower back pain', 'leg pain', 'numbness', 'tingling', 'muscle weakness'],
    description: 'Pain radiating along the path of the sciatic nerve from lower back to legs.'
  },
  {
    name: 'Tendinitis',
    symptoms: ['pain', 'tenderness', 'mild swelling', 'stiffness', 'reduced range of motion'],
    description: 'Inflammation of a tendon, often caused by repetitive motion.'
  },
  {
    name: 'Bursitis',
    symptoms: ['joint pain', 'stiffness', 'swelling', 'tenderness', 'limited movement'],
    description: 'Inflammation of the fluid-filled sacs that cushion bones, tendons and muscles.'
  },
  {
    name: 'Plantar Fasciitis',
    symptoms: ['heel pain', 'foot stiffness', 'pain after sitting', 'pain in morning'],
    description: 'Inflammation of the tissue connecting heel bone to toes.'
  },
  {
    name: 'Lactose Intolerance',
    symptoms: ['diarrhea', 'nausea', 'stomach cramps', 'bloating', 'gas'],
    description: 'Inability to fully digest lactose, the sugar in milk and dairy products.'
  },
  {
    name: 'Celiac Disease',
    symptoms: ['diarrhea', 'fatigue', 'weight loss', 'bloating', 'anemia'],
    description: 'An immune reaction to eating gluten, a protein found in wheat, barley and rye.'
  },
  {
    name: 'Chronic Fatigue Syndrome',
    symptoms: ['extreme fatigue', 'sleep problems', 'muscle pain', 'headaches', 'difficulty concentrating'],
    description: 'A complicated disorder characterized by extreme fatigue that lasts for months.'
  },
  {
    name: 'Restless Leg Syndrome',
    symptoms: ['urge to move legs', 'uncomfortable sensations', 'symptoms worsen at night', 'sleep disturbance'],
    description: 'A condition causing uncomfortable sensations in legs and urge to move them.'
  },
  {
    name: 'Hemorrhoids',
    symptoms: ['rectal bleeding', 'itching', 'pain', 'swelling around anus', 'discomfort'],
    description: 'Swollen veins in the lowest part of rectum and anus.'
  },
  {
    name: 'Varicose Veins',
    symptoms: ['visible twisted veins', 'leg pain', 'swelling', 'heaviness in legs', 'skin changes'],
    description: 'Enlarged, twisted veins that are visible under the skin.'
  },
  {
    name: 'Shingles',
    symptoms: ['painful rash', 'blisters', 'burning sensation', 'fever', 'headache'],
    description: 'A viral infection causing a painful rash, caused by the same virus as chickenpox.'
  },
  {
    name: 'Mononucleosis',
    symptoms: ['fatigue', 'sore throat', 'fever', 'swollen lymph nodes', 'headache'],
    description: 'A viral infection often called "mono" or the "kissing disease".'
  },
  {
    name: 'Lyme Disease',
    symptoms: ['rash', 'fever', 'headache', 'fatigue', 'muscle aches'],
    description: 'A bacterial infection transmitted through tick bites.'
  },
  {
    name: 'Rosacea',
    symptoms: ['facial redness', 'swollen red bumps', 'eye problems', 'enlarged nose'],
    description: 'A common skin condition causing redness and visible blood vessels in face.'
  },
  {
    name: 'Seborrheic Dermatitis',
    symptoms: ['scaly patches', 'red skin', 'stubborn dandruff', 'itching'],
    description: 'A skin condition causing scaly, itchy rash mainly on scalp.'
  },
  {
    name: 'Diverticulitis',
    symptoms: ['abdominal pain', 'fever', 'nausea', 'changes in bowel habits'],
    description: 'Inflammation of small pouches that can form in intestinal walls.'
  },
  {
    name: 'Peripheral Neuropathy',
    symptoms: ['numbness', 'tingling', 'burning pain', 'muscle weakness', 'sensitivity to touch'],
    description: 'Damage to peripheral nerves causing weakness, numbness and pain.'
  },
  {
    name: 'Temporomandibular Joint Disorder',
    symptoms: ['jaw pain', 'difficulty chewing', 'clicking jaw', 'locked jaw', 'ear pain'],
    description: 'Problems with jaw muscles and joints connecting jawbone to skull.'
  },
  {
    name: 'Raynaud\'s Disease',
    symptoms: ['cold fingers', 'color changes in skin', 'numbness', 'tingling'],
    description: 'A condition affecting blood flow to fingers and toes in response to cold or stress.'
  },
  {
    name: 'Interstitial Cystitis',
    symptoms: ['bladder pressure', 'bladder pain', 'frequent urination', 'pelvic pain'],
    description: 'A chronic condition causing bladder pressure, bladder pain and sometimes pelvic pain.'
  },
  {
    name: 'Chronic Obstructive Pulmonary Disease',
    symptoms: ['shortness of breath', 'chronic cough', 'mucus production', 'wheezing', 'chest tightness'],
    description: 'A group of lung diseases that block airflow and make breathing difficult.'
  },
  {
    name: 'Atrial Fibrillation',
    symptoms: ['irregular heartbeat', 'heart palpitations', 'shortness of breath', 'weakness', 'fatigue'],
    description: 'An irregular and often rapid heart rate that commonly causes poor blood flow.'
  },
  {
    name: 'Deep Vein Thrombosis',
    symptoms: ['leg swelling', 'leg pain', 'red or discolored skin', 'warmth in leg'],
    description: 'A blood clot that forms in a deep vein, usually in legs.'
  },
  {
    name: 'Pulmonary Embolism',
    symptoms: ['sudden shortness of breath', 'chest pain', 'rapid heart rate', 'coughing up blood', 'dizziness'],
    description: 'A blockage in one of the pulmonary arteries in the lungs, usually caused by blood clots.'
  },

  // Additional 50 New Diseases
  {
    name: 'Crohn\'s Disease',
    symptoms: ['chronic diarrhea', 'abdominal pain', 'weight loss', 'rectal bleeding', 'fever'],
    description: 'A chronic inflammatory bowel disease affecting the digestive tract.'
  },
  {
    name: 'Ulcerative Colitis',
    symptoms: ['bloody diarrhea', 'abdominal cramping', 'urgency to defecate', 'fatigue', 'weight loss'],
    description: 'A chronic inflammatory disease of the large intestine and rectum.'
  },
  {
    name: 'Peptic Ulcer Disease',
    symptoms: ['burning stomach pain', 'bloating', 'heartburn', 'nausea', 'dark stools'],
    description: 'Open sores that develop on the inner lining of the stomach or upper small intestine.'
  },
  {
    name: 'Gastroesophageal Reflux Disease',
    symptoms: ['heartburn', 'acid regurgitation', 'difficulty swallowing', 'chest pain', 'chronic cough'],
    description: 'A chronic condition where stomach acid frequently flows back into the esophagus.'
  },
  {
    name: 'Chronic Pancreatitis',
    symptoms: ['persistent abdominal pain', 'nausea', 'vomiting', 'weight loss', 'oily stools'],
    description: 'Long-term inflammation of the pancreas that progressively worsens over time.'
  },
  {
    name: 'Cirrhosis',
    symptoms: ['fatigue', 'jaundice', 'abdominal swelling', 'confusion', 'easy bruising'],
    description: 'Severe scarring of the liver and poor liver function due to chronic liver disease.'
  },
  {
    name: 'Coronary Artery Disease',
    symptoms: ['chest pain', 'shortness of breath', 'fatigue', 'irregular heartbeat', 'weakness'],
    description: 'The most common type of heart disease caused by narrowed or blocked coronary arteries.'
  },
  {
    name: 'Peripheral Artery Disease',
    symptoms: ['leg pain when walking', 'leg numbness', 'coldness in legs', 'leg weakness', 'slow wound healing'],
    description: 'A circulatory condition where narrowed arteries reduce blood flow to the limbs.'
  },
  {
    name: 'Aortic Aneurysm',
    symptoms: ['deep abdominal pain', 'back pain', 'pulsating feeling in abdomen', 'nausea', 'vomiting'],
    description: 'An enlarged area in the aorta, the body\'s main artery, that can be life-threatening.'
  },
  {
    name: 'Mitral Valve Prolapse',
    symptoms: ['heart palpitations', 'chest pain', 'fatigue', 'dizziness', 'shortness of breath'],
    description: 'A condition where the valve between the left chambers of the heart doesn\'t close properly.'
  },
  {
    name: 'Acute Bronchiolitis',
    symptoms: ['wheezing', 'rapid breathing', 'cough', 'fever', 'difficulty feeding'],
    description: 'A viral infection causing inflammation and congestion in the small airways of the lungs.'
  },
  {
    name: 'Emphysema',
    symptoms: ['shortness of breath', 'chronic cough', 'wheezing', 'fatigue', 'weight loss'],
    description: 'A lung condition causing shortness of breath due to damaged air sacs in the lungs.'
  },
  {
    name: 'Pulmonary Fibrosis',
    symptoms: ['dry cough', 'shortness of breath', 'fatigue', 'unexplained weight loss', 'muscle aches'],
    description: 'A lung disease that occurs when lung tissue becomes damaged and scarred.'
  },
  {
    name: 'Sarcoidosis',
    symptoms: ['persistent cough', 'shortness of breath', 'skin rashes', 'swollen lymph nodes', 'fatigue'],
    description: 'An inflammatory disease affecting multiple organs, most commonly the lungs and lymph glands.'
  },
  {
    name: 'Chronic Sinusitis',
    symptoms: ['nasal congestion', 'facial pressure', 'reduced sense of smell', 'thick nasal discharge', 'ear fullness'],
    description: 'A common condition where the cavities around nasal passages become inflamed for 12 weeks or longer.'
  },
  {
    name: 'Addison\'s Disease',
    symptoms: ['extreme fatigue', 'weight loss', 'low blood pressure', 'darkening of skin', 'salt cravings'],
    description: 'A rare disorder where the adrenal glands don\'t produce enough hormones.'
  },
  {
    name: 'Cushing\'s Syndrome',
    symptoms: ['weight gain', 'purple stretch marks', 'high blood pressure', 'muscle weakness', 'mood changes'],
    description: 'A hormonal disorder caused by prolonged exposure to high levels of cortisol.'
  },
  {
    name: 'Polycystic Kidney Disease',
    symptoms: ['high blood pressure', 'back pain', 'kidney stones', 'urinary tract infections', 'blood in urine'],
    description: 'An inherited disorder causing numerous cysts to grow in the kidneys.'
  },
  {
    name: 'Acute Glomerulonephritis',
    symptoms: ['blood in urine', 'foamy urine', 'swelling', 'high blood pressure', 'fatigue'],
    description: 'Inflammation of the tiny filters in the kidneys that can lead to kidney damage.'
  },
  {
    name: 'Nephrotic Syndrome',
    symptoms: ['severe swelling', 'foamy urine', 'weight gain', 'fatigue', 'loss of appetite'],
    description: 'A kidney disorder causing the body to excrete too much protein in the urine.'
  },
  {
    name: 'Huntington\'s Disease',
    symptoms: ['involuntary movements', 'cognitive decline', 'emotional problems', 'difficulty swallowing', 'balance problems'],
    description: 'An inherited condition causing progressive breakdown of nerve cells in the brain.'
  },
  {
    name: 'Amyotrophic Lateral Sclerosis',
    symptoms: ['muscle weakness', 'difficulty speaking', 'trouble swallowing', 'muscle cramps', 'twitching'],
    description: 'A progressive nervous system disease affecting nerve cells in the brain and spinal cord.'
  },
  {
    name: 'Myasthenia Gravis',
    symptoms: ['muscle weakness', 'drooping eyelids', 'double vision', 'difficulty speaking', 'difficulty swallowing'],
    description: 'A chronic autoimmune disorder affecting communication between nerves and muscles.'
  },
  {
    name: 'Guillain-Barré Syndrome',
    symptoms: ['muscle weakness', 'tingling sensations', 'pain', 'difficulty walking', 'breathing difficulties'],
    description: 'A rare disorder where the immune system attacks the peripheral nervous system.'
  },
  {
    name: 'Trigeminal Neuralgia',
    symptoms: ['severe facial pain', 'shooting pain', 'touching face triggers pain', 'jaw pain', 'tooth pain'],
    description: 'A chronic pain condition affecting the trigeminal nerve in the face.'
  },
  {
    name: 'Meniere\'s Disease',
    symptoms: ['vertigo', 'hearing loss', 'tinnitus', 'ear fullness', 'nausea'],
    description: 'An inner ear disorder that can affect hearing and balance.'
  },
  {
    name: 'Labyrinthitis',
    symptoms: ['dizziness', 'hearing loss', 'ear pain', 'nausea', 'balance problems'],
    description: 'Inflammation of the inner ear that can cause dizziness and hearing problems.'
  },
  {
    name: 'Acoustic Neuroma',
    symptoms: ['hearing loss', 'tinnitus', 'balance problems', 'facial numbness', 'headaches'],
    description: 'A noncancerous tumor that develops on the nerve that connects the ear to the brain.'
  },
  {
    name: 'Macular Degeneration',
    symptoms: ['blurred vision', 'dark spots in vision', 'difficulty recognizing faces', 'straight lines appear wavy', 'need for brighter light'],
    description: 'An eye disease that can blur the sharp, central vision needed for activities like reading.'
  },
  {
    name: 'Diabetic Retinopathy',
    symptoms: ['blurred vision', 'floaters', 'dark areas in vision', 'difficulty seeing colors', 'vision loss'],
    description: 'A diabetes complication that affects eyes caused by damage to blood vessels in the retina.'
  },
  {
    name: 'Retinal Detachment',
    symptoms: ['sudden flashes of light', 'floaters', 'shadow in peripheral vision', 'curtain effect over vision', 'sudden vision loss'],
    description: 'A serious eye condition where the retina pulls away from the tissue underneath it.'
  },
  {
    name: 'Keratoconus',
    symptoms: ['blurred vision', 'distorted vision', 'increased light sensitivity', 'glare', 'frequent prescription changes'],
    description: 'An eye condition where the cornea thins and gradually bulges outward into a cone shape.'
  },
  {
    name: 'Dry Eye Syndrome',
    symptoms: ['burning eyes', 'gritty feeling', 'excessive tearing', 'blurred vision', 'eye fatigue'],
    description: 'A common condition that occurs when tears aren\'t able to provide adequate lubrication for eyes.'
  },
  {
    name: 'Hidradenitis Suppurativa',
    symptoms: ['painful lumps under skin', 'blackheads', 'tunnels under skin', 'scarring', 'foul-smelling discharge'],
    description: 'A chronic skin condition featuring lumps in places such as the armpits or groin.'
  },
  {
    name: 'Vitiligo',
    symptoms: ['white patches on skin', 'premature graying of hair', 'loss of color inside mouth', 'loss of color in retina', 'patches spreading'],
    description: 'A condition causing patches of skin to lose their pigmentation.'
  },
  {
    name: 'Pemphigus',
    symptoms: ['blisters on skin', 'blisters in mouth', 'painful sores', 'crusting', 'skin peeling'],
    description: 'A group of rare autoimmune diseases that cause blistering of the skin and mucous membranes.'
  },
  {
    name: 'Bullous Pemphigoid',
    symptoms: ['large blisters', 'itchy rash', 'red patches', 'hives', 'blisters that don\'t break easily'],
    description: 'An autoimmune disorder causing large, fluid-filled blisters on areas of skin that often flex.'
  },
  {
    name: 'Systemic Lupus Erythematosus',
    symptoms: ['butterfly rash', 'joint pain', 'fatigue', 'fever', 'hair loss'],
    description: 'An autoimmune disease where the immune system attacks its own tissues.'
  },
  {
    name: 'Sjögren\'s Syndrome',
    symptoms: ['dry eyes', 'dry mouth', 'joint pain', 'fatigue', 'skin rashes'],
    description: 'An autoimmune disorder that primarily affects the glands that produce tears and saliva.'
  },
  {
    name: 'Scleroderma',
    symptoms: ['hardening of skin', 'Raynaud\'s phenomenon', 'heartburn', 'difficulty swallowing', 'shortness of breath'],
    description: 'A group of autoimmune diseases that may result in changes to the skin, blood vessels, muscles, and internal organs.'
  },
  {
    name: 'Polymyositis',
    symptoms: ['muscle weakness', 'muscle pain', 'difficulty swallowing', 'fatigue', 'fever'],
    description: 'An inflammatory muscle disease causing weakness and inflammation of the skeletal muscles.'
  },
  {
    name: 'Dermatomyositis',
    symptoms: ['muscle weakness', 'distinctive skin rash', 'difficulty swallowing', 'lung problems', 'calcium deposits'],
    description: 'An inflammatory disease marked by muscle weakness and a distinctive skin rash.'
  },
  {
    name: 'Giant Cell Arteritis',
    symptoms: ['severe headaches', 'jaw pain when chewing', 'vision problems', 'scalp tenderness', 'fever'],
    description: 'Inflammation of the lining of the arteries, most commonly affecting those in the head.'
  },
  {
    name: 'Polymyalgia Rheumatica',
    symptoms: ['muscle aches', 'stiffness in shoulders', 'stiffness in hips', 'fatigue', 'mild fever'],
    description: 'An inflammatory disorder causing muscle pain and stiffness around the shoulders and hips.'
  },
  {
    name: 'Takayasu Arteritis',
    symptoms: ['fatigue', 'weight loss', 'muscle aches', 'high blood pressure', 'weak pulse'],
    description: 'A rare type of vasculitis that causes inflammation of the aorta and its main branches.'
  },
  {
    name: 'Behcet\'s Disease',
    symptoms: ['mouth sores', 'genital sores', 'eye inflammation', 'skin lesions', 'joint pain'],
    description: 'A rare disorder that causes blood vessel inflammation throughout the body.'
  },
  {
    name: 'Kawasaki Disease',
    symptoms: ['high fever', 'rash', 'swollen lymph nodes', 'red eyes', 'swollen hands and feet'],
    description: 'An illness that causes inflammation in the walls of medium-sized arteries throughout the body.'
  },
  {
    name: 'Marfan Syndrome',
    symptoms: ['tall stature', 'long limbs', 'flexible joints', 'heart murmur', 'vision problems'],
    description: 'A genetic disorder that affects the connective tissue throughout the body.'
  },
  {
    name: 'Ehlers-Danlos Syndrome',
    symptoms: ['stretchy skin', 'loose joints', 'fragile skin', 'easy bruising', 'chronic pain'],
    description: 'A group of disorders that affect connective tissues supporting the skin, bones, blood vessels, and other organs.'
  },
  {
    name: 'Osteogenesis Imperfecta',
    symptoms: ['frequent bone fractures', 'short stature', 'triangular face', 'hearing loss', 'blue sclerae'],
    description: 'A genetic disorder characterized by bones that break easily with little or no obvious cause.'
  },
  {
    name: 'Hemophilia',
    symptoms: ['excessive bleeding', 'easy bruising', 'bleeding into joints', 'blood in urine', 'nosebleeds'],
    description: 'A rare disorder where blood doesn\'t clot normally due to lack of blood-clotting proteins.'
  },
  {
    name: 'Von Willebrand Disease',
    symptoms: ['easy bruising', 'frequent nosebleeds', 'heavy menstrual periods', 'excessive bleeding after surgery', 'bleeding gums'],
    description: 'The most common inherited bleeding disorder caused by deficiency in von Willebrand factor.'
  }
];

const sampleMedicines = [
  // Respiratory Diseases
  {
    disease: 'Common Cold',
    medicines: [
      { name: 'Paracetamol', type: 'Tablet', dosage: '500mg' },
      { name: 'Ibuprofen', type: 'Tablet', dosage: '200mg' },
      { name: 'Cough Syrup', type: 'Syrup', dosage: '10ml' }
    ]
  },
  {
    disease: 'Influenza (Flu)',
    medicines: [
      { name: 'Oseltamivir', type: 'Capsule', dosage: '75mg' },
      { name: 'Paracetamol', type: 'Tablet', dosage: '500mg' },
      { name: 'Rest and Fluids', type: 'Tablet', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Pneumonia',
    medicines: [
      { name: 'Amoxicillin', type: 'Tablet', dosage: '500mg' },
      { name: 'Azithromycin', type: 'Tablet', dosage: '250mg' },
      { name: 'Cefuroxime', type: 'Tablet', dosage: '250mg' }
    ]
  },
  {
    disease: 'Asthma',
    medicines: [
      { name: 'Salbutamol', type: 'Inhaler', dosage: '100mcg' },
      { name: 'Beclomethasone', type: 'Inhaler', dosage: '50mcg' },
      { name: 'Montelukast', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Bronchitis',
    medicines: [
      { name: 'Dextromethorphan', type: 'Syrup', dosage: '15mg' },
      { name: 'Guaifenesin', type: 'Tablet', dosage: '400mg' },
      { name: 'Prednisone', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Tuberculosis',
    medicines: [
      { name: 'Rifampin', type: 'Capsule', dosage: '300mg' },
      { name: 'Isoniazid', type: 'Tablet', dosage: '300mg' },
      { name: 'Ethambutol', type: 'Tablet', dosage: '400mg' }
    ]
  },
  {
    disease: 'Whooping Cough',
    medicines: [
      { name: 'Azithromycin', type: 'Tablet', dosage: '250mg' },
      { name: 'Erythromycin', type: 'Tablet', dosage: '250mg' },
      { name: 'Clarithromycin', type: 'Tablet', dosage: '250mg' }
    ]
  },
  {
    disease: 'Sinusitis',
    medicines: [
      { name: 'Amoxicillin', type: 'Capsule', dosage: '500mg' },
      { name: 'Fluticasone', type: 'Spray', dosage: '50mcg per spray' },
      { name: 'Pseudoephedrine', type: 'Tablet', dosage: '30mg' }
    ]
  },

  // Cardiovascular Diseases
  {
    disease: 'Hypertension',
    medicines: [
      { name: 'Lisinopril', type: 'Tablet', dosage: '10mg' },
      { name: 'Amlodipine', type: 'Tablet', dosage: '5mg' },
      { name: 'Hydrochlorothiazide', type: 'Tablet', dosage: '25mg' }
    ]
  },
  {
    disease: 'Heart Attack',
    medicines: [
      { name: 'Aspirin', type: 'Tablet', dosage: '81mg' },
      { name: 'Clopidogrel', type: 'Tablet', dosage: '75mg' },
      { name: 'Atorvastatin', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Angina',
    medicines: [
      { name: 'Nitroglycerin', type: 'Tablet', dosage: '0.4mg' },
      { name: 'Metoprolol', type: 'Tablet', dosage: '50mg' },
      { name: 'Diltiazem', type: 'Tablet', dosage: '120mg' }
    ]
  },
  {
    disease: 'Arrhythmia',
    medicines: [
      { name: 'Amiodarone', type: 'Tablet', dosage: '200mg' },
      { name: 'Flecainide', type: 'Tablet', dosage: '50mg' },
      { name: 'Digoxin', type: 'Tablet', dosage: '0.25mg' }
    ]
  },

  // Gastrointestinal Diseases
  {
    disease: 'Gastroenteritis',
    medicines: [
      { name: 'ORS Solution', type: 'Syrup', dosage: '200ml' },
      { name: 'Loperamide', type: 'Tablet', dosage: '2mg' },
      { name: 'Probiotics', type: 'Capsule', dosage: '1 capsule' }
    ]
  },
  {
    disease: 'Gastric Ulcer',
    medicines: [
      { name: 'Omeprazole', type: 'Capsule', dosage: '20mg' },
      { name: 'Ranitidine', type: 'Tablet', dosage: '150mg' },
      { name: 'Sucralfate', type: 'Tablet', dosage: '1g' }
    ]
  },
  {
    disease: 'Irritable Bowel Syndrome',
    medicines: [
      { name: 'Dicyclomine', type: 'Tablet', dosage: '10mg' },
      { name: 'Psyllium', type: 'Powder', dosage: '1 tsp' },
      { name: 'Simethicone', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Appendicitis',
    medicines: [
      { name: 'Morphine', type: 'Injection', dosage: '10mg' },
      { name: 'Ceftriaxone', type: 'Injection', dosage: '1g' },
      { name: 'Metronidazole', type: 'Tablet', dosage: '500mg' }
    ]
  },
  {
    disease: 'Gallstones',
    medicines: [
      { name: 'Ursodeoxycholic acid', type: 'Capsule', dosage: '300mg' },
      { name: 'Chenodeoxycholic acid', type: 'Tablet', dosage: '250mg' },
      { name: 'Tramadol', type: 'Tablet', dosage: '50mg' }
    ]
  },
  {
    disease: 'Hepatitis',
    medicines: [
      { name: 'Interferon alfa', type: 'Injection', dosage: '3 million units' },
      { name: 'Ribavirin', type: 'Capsule', dosage: '200mg' },
      { name: 'Tenofovir', type: 'Tablet', dosage: '300mg' }
    ]
  },

  // Infectious Diseases
  {
    disease: 'Malaria',
    medicines: [
      { name: 'Chloroquine', type: 'Tablet', dosage: '500mg' },
      { name: 'Artemether', type: 'Injection', dosage: '80mg' },
      { name: 'Primaquine', type: 'Tablet', dosage: '15mg' }
    ]
  },
  {
    disease: 'Dengue Fever',
    medicines: [
      { name: 'Paracetamol', type: 'Tablet', dosage: '500mg' },
      { name: 'ORS Solution', type: 'Powder', dosage: '1 packet' },
      { name: 'Platelet Transfusion', type: 'Injection', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Typhoid',
    medicines: [
      { name: 'Ciprofloxacin', type: 'Tablet', dosage: '500mg' },
      { name: 'Azithromycin', type: 'Tablet', dosage: '500mg' },
      { name: 'Ceftriaxone', type: 'Injection', dosage: '2g' }
    ]
  },
  {
    disease: 'Chickenpox',
    medicines: [
      { name: 'Acyclovir', type: 'Tablet', dosage: '800mg' },
      { name: 'Calamine Lotion', type: 'Lotion', dosage: 'Apply topically' },
      { name: 'Paracetamol', type: 'Tablet', dosage: '500mg' }
    ]
  },
  {
    disease: 'Measles',
    medicines: [
      { name: 'Vitamin A', type: 'Capsule', dosage: '200,000 IU' },
      { name: 'Paracetamol', type: 'Tablet', dosage: '500mg' },
      { name: 'Ribavirin', type: 'Tablet', dosage: '400mg' }
    ]
  },
  {
    disease: 'Mumps',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '400mg' },
      { name: 'Paracetamol', type: 'Tablet', dosage: '500mg' },
      { name: 'Warm compress', type: 'Tablet', dosage: 'As needed' }
    ]
  },

  // Neurological Diseases
  {
    disease: 'Migraine',
    medicines: [
      { name: 'Sumatriptan', type: 'Tablet', dosage: '50mg' },
      { name: 'Ibuprofen', type: 'Tablet', dosage: '400mg' },
      { name: 'Rizatriptan', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Epilepsy',
    medicines: [
      { name: 'Phenytoin', type: 'Capsule', dosage: '100mg' },
      { name: 'Carbamazepine', type: 'Tablet', dosage: '200mg' },
      { name: 'Valproic acid', type: 'Tablet', dosage: '250mg' }
    ]
  },
  {
    disease: 'Stroke',
    medicines: [
      { name: 'Aspirin', type: 'Tablet', dosage: '325mg' },
      { name: 'Clopidogrel', type: 'Tablet', dosage: '75mg' },
      { name: 'Atorvastatin', type: 'Tablet', dosage: '80mg' }
    ]
  },
  {
    disease: 'Alzheimer\'s Disease',
    medicines: [
      { name: 'Donepezil', type: 'Tablet', dosage: '10mg' },
      { name: 'Memantine', type: 'Tablet', dosage: '10mg' },
      { name: 'Rivastigmine', type: 'Patch', dosage: '9.5mg/24hr' }
    ]
  },
  {
    disease: 'Parkinson\'s Disease',
    medicines: [
      { name: 'Levodopa', type: 'Tablet', dosage: '100mg' },
      { name: 'Carbidopa', type: 'Tablet', dosage: '25mg' },
      { name: 'Pramipexole', type: 'Tablet', dosage: '0.5mg' }
    ]
  },

  // Endocrine Diseases
  {
    disease: 'Diabetes Type 1',
    medicines: [
      { name: 'Insulin Rapid', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Insulin Long-acting', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Glucagon', type: 'Injection', dosage: '1mg' }
    ]
  },
  {
    disease: 'Diabetes Type 2',
    medicines: [
      { name: 'Metformin', type: 'Tablet', dosage: '500mg' },
      { name: 'Glipizide', type: 'Tablet', dosage: '5mg' },
      { name: 'Insulin', type: 'Injection', dosage: 'As prescribed' }
    ]
  },
  {
    disease: 'Hyperthyroidism',
    medicines: [
      { name: 'Methimazole', type: 'Tablet', dosage: '5mg' },
      { name: 'Propylthiouracil', type: 'Tablet', dosage: '50mg' },
      { name: 'Propranolol', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Hypothyroidism',
    medicines: [
      { name: 'Levothyroxine', type: 'Tablet', dosage: '50mcg' },
      { name: 'Liothyronine', type: 'Tablet', dosage: '5mcg' },
      { name: 'Desiccated thyroid', type: 'Tablet', dosage: '60mg' }
    ]
  },

  // Mental Health Disorders
  {
    disease: 'Anxiety Disorder',
    medicines: [
      { name: 'Sertraline', type: 'Tablet', dosage: '50mg' },
      { name: 'Lorazepam', type: 'Tablet', dosage: '0.5mg' },
      { name: 'Buspirone', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Depression',
    medicines: [
      { name: 'Fluoxetine', type: 'Capsule', dosage: '20mg' },
      { name: 'Sertraline', type: 'Tablet', dosage: '50mg' },
      { name: 'Bupropion', type: 'Tablet', dosage: '150mg' }
    ]
  },
  {
    disease: 'Bipolar Disorder',
    medicines: [
      { name: 'Lithium', type: 'Tablet', dosage: '300mg' },
      { name: 'Valproic acid', type: 'Tablet', dosage: '250mg' },
      { name: 'Olanzapine', type: 'Tablet', dosage: '5mg' }
    ]
  },
  {
    disease: 'Panic Disorder',
    medicines: [
      { name: 'Alprazolam', type: 'Tablet', dosage: '0.25mg' },
      { name: 'Sertraline', type: 'Tablet', dosage: '25mg' },
      { name: 'Clonazepam', type: 'Tablet', dosage: '0.5mg' }
    ]
  },

  // Skin Diseases
  {
    disease: 'Eczema',
    medicines: [
      { name: 'Hydrocortisone', type: 'Cream', dosage: '1%' },
      { name: 'Tacrolimus', type: 'Ointment', dosage: '0.1%' },
      { name: 'Cetaphil Moisturizer', type: 'Cream', dosage: 'Apply twice daily' }
    ]
  },
  {
    disease: 'Psoriasis',
    medicines: [
      { name: 'Methotrexate', type: 'Tablet', dosage: '7.5mg' },
      { name: 'Calcipotriene', type: 'Cream', dosage: '0.005%' },
      { name: 'Betamethasone', type: 'Ointment', dosage: '0.05%' }
    ]
  },
  {
    disease: 'Acne',
    medicines: [
      { name: 'Benzoyl peroxide', type: 'Gel', dosage: '5%' },
      { name: 'Tretinoin', type: 'Cream', dosage: '0.025%' },
      { name: 'Clindamycin', type: 'Gel', dosage: '1%' }
    ]
  },
  {
    disease: 'Fungal Infection',
    medicines: [
      { name: 'Fluconazole', type: 'Tablet', dosage: '150mg' },
      { name: 'Terbinafine', type: 'Cream', dosage: '1%' },
      { name: 'Ketoconazole', type: 'Shampoo', dosage: '2%' }
    ]
  },

  // Musculoskeletal Diseases
  {
    disease: 'Arthritis',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '400mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '10mg' },
      { name: 'Prednisone', type: 'Tablet', dosage: '5mg' }
    ]
  },
  {
    disease: 'Osteoporosis',
    medicines: [
      { name: 'Alendronate', type: 'Tablet', dosage: '70mg' },
      { name: 'Calcium', type: 'Tablet', dosage: '500mg' },
      { name: 'Vitamin D3', type: 'Tablet', dosage: '1000 IU' }
    ]
  },
  {
    disease: 'Fibromyalgia',
    medicines: [
      { name: 'Pregabalin', type: 'Capsule', dosage: '75mg' },
      { name: 'Duloxetine', type: 'Capsule', dosage: '30mg' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' }
    ]
  },
  {
    disease: 'Gout',
    medicines: [
      { name: 'Allopurinol', type: 'Tablet', dosage: '100mg' },
      { name: 'Colchicine', type: 'Tablet', dosage: '0.6mg' },
      { name: 'Indomethacin', type: 'Capsule', dosage: '25mg' }
    ]
  },

  // Eye and Ear Diseases
  {
    disease: 'Conjunctivitis',
    medicines: [
      { name: 'Tobramycin', type: 'Drops', dosage: '0.3%' },
      { name: 'Ofloxacin', type: 'Drops', dosage: '0.3%' },
      { name: 'Artificial tears', type: 'Drops', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Glaucoma',
    medicines: [
      { name: 'Timolol', type: 'Drops', dosage: '0.5%' },
      { name: 'Latanoprost', type: 'Drops', dosage: '0.005%' },
      { name: 'Brimonidine', type: 'Drops', dosage: '0.2%' }
    ]
  },
  {
    disease: 'Cataracts',
    medicines: [
      { name: 'Artificial tears', type: 'Drops', dosage: 'As needed' },
      { name: 'Anti-glare glasses', type: 'Tablet', dosage: 'As needed' },
      { name: 'Surgery preparation', type: 'Tablet', dosage: 'Pre-operative' }
    ]
  },
  {
    disease: 'Ear Infection',
    medicines: [
      { name: 'Amoxicillin', type: 'Suspension', dosage: '250mg/5ml' },
      { name: 'Ciprofloxacin', type: 'Drops', dosage: '0.3%' },
      { name: 'Ibuprofen', type: 'Tablet', dosage: '200mg' }
    ]
  },
  {
    disease: 'Tinnitus',
    medicines: [
      { name: 'Ginkgo biloba', type: 'Tablet', dosage: '120mg' },
      { name: 'Betahistine', type: 'Tablet', dosage: '16mg' },
      { name: 'Melatonin', type: 'Tablet', dosage: '3mg' }
    ]
  },

  // Genitourinary Diseases
  {
    disease: 'Kidney Stones',
    medicines: [
      { name: 'Tamsulosin', type: 'Capsule', dosage: '0.4mg' },
      { name: 'Potassium citrate', type: 'Tablet', dosage: '10mEq' },
      { name: 'Ketorolac', type: 'Injection', dosage: '30mg' }
    ]
  },
  {
    disease: 'Urinary Tract Infection',
    medicines: [
      { name: 'Trimethoprim', type: 'Tablet', dosage: '100mg' },
      { name: 'Nitrofurantoin', type: 'Capsule', dosage: '100mg' },
      { name: 'Ciprofloxacin', type: 'Tablet', dosage: '250mg' }
    ]
  },
  {
    disease: 'Chronic Kidney Disease',
    medicines: [
      { name: 'Lisinopril', type: 'Tablet', dosage: '10mg' },
      { name: 'Furosemide', type: 'Tablet', dosage: '40mg' },
      { name: 'Calcium acetate', type: 'Tablet', dosage: '667mg' }
    ]
  },

  // Blood Disorders
  {
    disease: 'Anemia',
    medicines: [
      { name: 'Iron sulfate', type: 'Tablet', dosage: '325mg' },
      { name: 'Vitamin B12', type: 'Injection', dosage: '1000mcg' },
      { name: 'Folic acid', type: 'Tablet', dosage: '5mg' }
    ]
  },
  {
    disease: 'Leukemia',
    medicines: [
      { name: 'Imatinib', type: 'Tablet', dosage: '400mg' },
      { name: 'Methotrexate', type: 'Injection', dosage: '15mg/m2' },
      { name: 'Prednisone', type: 'Tablet', dosage: '60mg' }
    ]
  },

  // Women's Health
  {
    disease: 'Polycystic Ovary Syndrome',
    medicines: [
      { name: 'Metformin', type: 'Tablet', dosage: '500mg' },
      { name: 'Oral contraceptives', type: 'Tablet', dosage: 'As prescribed' },
      { name: 'Spironolactone', type: 'Tablet', dosage: '100mg' }
    ]
  },
  {
    disease: 'Endometriosis',
    medicines: [
      { name: 'Naproxen', type: 'Tablet', dosage: '220mg' },
      { name: 'Leuprolide', type: 'Injection', dosage: '3.75mg' },
      { name: 'Danazol', type: 'Capsule', dosage: '200mg' }
    ]
  },

  // Autoimmune Diseases
  {
    disease: 'Rheumatoid Arthritis',
    medicines: [
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' },
      { name: 'Hydroxychloroquine', type: 'Tablet', dosage: '200mg' },
      { name: 'Etanercept', type: 'Injection', dosage: '25mg' }
    ]
  },
  {
    disease: 'Lupus',
    medicines: [
      { name: 'Hydroxychloroquine', type: 'Tablet', dosage: '400mg' },
      { name: 'Prednisone', type: 'Tablet', dosage: '10mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Multiple Sclerosis',
    medicines: [
      { name: 'Interferon beta-1a', type: 'Injection', dosage: '30mcg' },
      { name: 'Glatiramer acetate', type: 'Injection', dosage: '20mg' },
      { name: 'Methylprednisolone', type: 'Injection', dosage: '1g' }
    ]
  },

  // Allergies
  {
    disease: 'Allergic Rhinitis',
    medicines: [
      { name: 'Cetirizine', type: 'Tablet', dosage: '10mg' },
      { name: 'Fluticasone', type: 'Spray', dosage: '50mcg per spray' },
      { name: 'Montelukast', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Food Allergies',
    medicines: [
      { name: 'Epinephrine', type: 'Injection', dosage: '0.3mg' },
      { name: 'Diphenhydramine', type: 'Tablet', dosage: '25mg' },
      { name: 'Prednisone', type: 'Tablet', dosage: '20mg' }
    ]
  },

  // Sleep Disorders
  {
    disease: 'Sleep Apnea',
    medicines: [
      { name: 'CPAP therapy', type: 'Tablet', dosage: 'Nightly' },
      { name: 'Modafinil', type: 'Tablet', dosage: '200mg' },
      { name: 'Armodafinil', type: 'Tablet', dosage: '150mg' }
    ]
  },
  {
    disease: 'Insomnia',
    medicines: [
      { name: 'Zolpidem', type: 'Tablet', dosage: '10mg' },
      { name: 'Melatonin', type: 'Tablet', dosage: '3mg' },
      { name: 'Trazodone', type: 'Tablet', dosage: '50mg' }
    ]
  },

  // Cancer (basic supportive care)
  {
    disease: 'Lung Cancer',
    medicines: [
      { name: 'Carboplatin', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Paclitaxel', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Morphine', type: 'Tablet', dosage: '15mg' }
    ]
  },
  {
    disease: 'Breast Cancer',
    medicines: [
      { name: 'Tamoxifen', type: 'Tablet', dosage: '20mg' },
      { name: 'Trastuzumab', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Anastrozole', type: 'Tablet', dosage: '1mg' }
    ]
  },
  {
    disease: 'Colorectal Cancer',
    medicines: [
      { name: 'Fluorouracil', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Oxaliplatin', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Bevacizumab', type: 'Injection', dosage: 'As prescribed' }
    ]
  },

  // Metabolic Disorders
  {
    disease: 'Obesity',
    medicines: [
      { name: 'Orlistat', type: 'Capsule', dosage: '120mg' },
      { name: 'Phentermine', type: 'Tablet', dosage: '37.5mg' },
      { name: 'Liraglutide', type: 'Injection', dosage: '3mg' }
    ]
  },
  {
    disease: 'Metabolic Syndrome',
    medicines: [
      { name: 'Metformin', type: 'Tablet', dosage: '500mg' },
      { name: 'Atorvastatin', type: 'Tablet', dosage: '20mg' },
      { name: 'Lisinopril', type: 'Tablet', dosage: '10mg' }
    ]
  },

  // Neurological Conditions
  {
    disease: 'Vertigo',
    medicines: [
      { name: 'Meclizine', type: 'Tablet', dosage: '25mg' },
      { name: 'Dimenhydrinate', type: 'Tablet', dosage: '50mg' },
      { name: 'Betahistine', type: 'Tablet', dosage: '16mg' }
    ]
  },
  {
    disease: 'Bell\'s Palsy',
    medicines: [
      { name: 'Prednisone', type: 'Tablet', dosage: '60mg' },
      { name: 'Acyclovir', type: 'Tablet', dosage: '800mg' },
      { name: 'Artificial tears', type: 'Drops', dosage: 'As needed' }
    ]
  },

  // Musculoskeletal Conditions
  {
    disease: 'Carpal Tunnel Syndrome',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '600mg' },
      { name: 'Methylprednisolone', type: 'Injection', dosage: '40mg' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' }
    ]
  },
  {
    disease: 'Sciatica',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '600mg' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' },
      { name: 'Cyclobenzaprine', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Tendinitis',
    medicines: [
      { name: 'Naproxen', type: 'Tablet', dosage: '220mg' },
      { name: 'Diclofenac', type: 'Gel', dosage: '1%' },
      { name: 'Cortisone', type: 'Injection', dosage: '40mg' }
    ]
  },
  {
    disease: 'Bursitis',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '400mg' },
      { name: 'Triamcinolone', type: 'Injection', dosage: '40mg' },
      { name: 'Ice therapy', type: 'Tablet', dosage: '15-20 min' }
    ]
  },
  {
    disease: 'Plantar Fasciitis',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '600mg' },
      { name: 'Cortisone', type: 'Injection', dosage: '40mg' },
      { name: 'Stretching exercises', type: 'Tablet', dosage: 'Daily' }
    ]
  },

  // Digestive Disorders
  {
    disease: 'Lactose Intolerance',
    medicines: [
      { name: 'Lactase enzyme', type: 'Tablet', dosage: '9000 FCC units' },
      { name: 'Simethicone', type: 'Tablet', dosage: '80mg' },
      { name: 'Probiotics', type: 'Capsule', dosage: '50 billion CFU' }
    ]
  },
  {
    disease: 'Celiac Disease',
    medicines: [
      { name: 'Vitamin B12', type: 'Tablet', dosage: '1000mcg' },
      { name: 'Iron supplement', type: 'Tablet', dosage: '65mg' },
      { name: 'Calcium', type: 'Tablet', dosage: '1200mg' }
    ]
  },

  // Chronic Conditions
  {
    disease: 'Chronic Fatigue Syndrome',
    medicines: [
      { name: 'Modafinil', type: 'Tablet', dosage: '100mg' },
      { name: 'Coenzyme Q10', type: 'Capsule', dosage: '100mg' },
      { name: 'Magnesium', type: 'Tablet', dosage: '400mg' }
    ]
  },
  {
    disease: 'Restless Leg Syndrome',
    medicines: [
      { name: 'Pramipexole', type: 'Tablet', dosage: '0.125mg' },
      { name: 'Ropinirole', type: 'Tablet', dosage: '0.25mg' },
      { name: 'Iron sulfate', type: 'Tablet', dosage: '325mg' }
    ]
  },

  // Vascular Conditions
  {
    disease: 'Hemorrhoids',
    medicines: [
      { name: 'Hydrocortisone', type: 'Cream', dosage: '1%' },
      { name: 'Witch hazel', type: 'Pads', dosage: 'As needed' },
      { name: 'Docusate', type: 'Capsule', dosage: '100mg' }
    ]
  },
  {
    disease: 'Varicose Veins',
    medicines: [
      { name: 'Diosmin', type: 'Tablet', dosage: '450mg' },
      { name: 'Horse chestnut', type: 'Capsule', dosage: '300mg' },
      { name: 'Compression stockings', type: 'Tablet', dosage: '20-30 mmHg' }
    ]
  },

  // Viral Infections
  {
    disease: 'Shingles',
    medicines: [
      { name: 'Acyclovir', type: 'Tablet', dosage: '800mg' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' },
      { name: 'Calamine lotion', type: 'Lotion', dosage: 'Apply topically' }
    ]
  },
  {
    disease: 'Mononucleosis',
    medicines: [
      { name: 'Acetaminophen', type: 'Tablet', dosage: '650mg' },
      { name: 'Ibuprofen', type: 'Tablet', dosage: '400mg' },
      { name: 'Rest and fluids', type: 'Tablet', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Lyme Disease',
    medicines: [
      { name: 'Doxycycline', type: 'Tablet', dosage: '100mg' },
      { name: 'Amoxicillin', type: 'Capsule', dosage: '500mg' },
      { name: 'Cefuroxime', type: 'Tablet', dosage: '500mg' }
    ]
  },

  // Skin Conditions
  {
    disease: 'Rosacea',
    medicines: [
      { name: 'Metronidazole', type: 'Gel', dosage: '0.75%' },
      { name: 'Azelaic acid', type: 'Cream', dosage: '20%' },
      { name: 'Doxycycline', type: 'Capsule', dosage: '40mg' }
    ]
  },
  {
    disease: 'Seborrheic Dermatitis',
    medicines: [
      { name: 'Ketoconazole', type: 'Shampoo', dosage: '2%' },
      { name: 'Selenium sulfide', type: 'Shampoo', dosage: '2.5%' },
      { name: 'Hydrocortisone', type: 'Cream', dosage: '1%' }
    ]
  },

  // Additional Conditions
  {
    disease: 'Diverticulitis',
    medicines: [
      { name: 'Ciprofloxacin', type: 'Tablet', dosage: '500mg' },
      { name: 'Metronidazole', type: 'Tablet', dosage: '500mg' },
      { name: 'Acetaminophen', type: 'Tablet', dosage: '650mg' }
    ]
  },
  {
    disease: 'Peripheral Neuropathy',
    medicines: [
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' },
      { name: 'Pregabalin', type: 'Capsule', dosage: '75mg' },
      { name: 'Duloxetine', type: 'Capsule', dosage: '30mg' }
    ]
  },
  {
    disease: 'Temporomandibular Joint Disorder',
    medicines: [
      { name: 'Ibuprofen', type: 'Tablet', dosage: '600mg' },
      { name: 'Cyclobenzaprine', type: 'Tablet', dosage: '10mg' },
      { name: 'Mouth guard', type: 'Tablet', dosage: 'Nightly use' }
    ]
  },
  {
    disease: 'Raynaud\'s Disease',
    medicines: [
      { name: 'Nifedipine', type: 'Tablet', dosage: '30mg' },
      { name: 'Amlodipine', type: 'Tablet', dosage: '5mg' },
      { name: 'Sildenafil', type: 'Tablet', dosage: '20mg' }
    ]
  },
  {
    disease: 'Interstitial Cystitis',
    medicines: [
      { name: 'Pentosan polysulfate', type: 'Capsule', dosage: '100mg' },
      { name: 'Amitriptyline', type: 'Tablet', dosage: '25mg' },
      { name: 'Phenazopyridine', type: 'Tablet', dosage: '200mg' }
    ]
  },
  {
    disease: 'Chronic Obstructive Pulmonary Disease',
    medicines: [
      { name: 'Tiotropium', type: 'Inhaler', dosage: '18mcg' },
      { name: 'Salmeterol', type: 'Inhaler', dosage: '25mcg' },
      { name: 'Prednisone', type: 'Tablet', dosage: '20mg' }
    ]
  },
  {
    disease: 'Atrial Fibrillation',
    medicines: [
      { name: 'Warfarin', type: 'Tablet', dosage: '5mg' },
      { name: 'Apixaban', type: 'Tablet', dosage: '5mg' },
      { name: 'Metoprolol', type: 'Tablet', dosage: '50mg' }
    ]
  },
  {
    disease: 'Deep Vein Thrombosis',
    medicines: [
      { name: 'Enoxaparin', type: 'Injection', dosage: '40mg' },
      { name: 'Warfarin', type: 'Tablet', dosage: '5mg' },
      { name: 'Rivaroxaban', type: 'Tablet', dosage: '15mg' }
    ]
  },
  {
    disease: 'Pulmonary Embolism',
    medicines: [
      { name: 'Heparin', type: 'Injection', dosage: '80 units/kg' },
      { name: 'Warfarin', type: 'Tablet', dosage: '5mg' },
      { name: 'Alteplase', type: 'Injection', dosage: '100mg' }
    ]
  },

  // New Disease Medicines - 50 Additional Medicines
  {
    disease: 'Crohn\'s Disease',
    medicines: [
      { name: 'Mesalazine', type: 'Tablet', dosage: '500mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '40mg' },
      { name: 'Azathioprine', type: 'Tablet', dosage: '50mg' }
    ]
  },
  {
    disease: 'Ulcerative Colitis',
    medicines: [
      { name: 'Sulfasalazine', type: 'Tablet', dosage: '500mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '40mg' },
      { name: 'Mesalazine', type: 'Suspension', dosage: '1g' }
    ]
  },
  {
    disease: 'Peptic Ulcer Disease',
    medicines: [
      { name: 'Omeprazole', type: 'Capsule', dosage: '20mg' },
      { name: 'Amoxicillin', type: 'Capsule', dosage: '1g' },
      { name: 'Clarithromycin', type: 'Tablet', dosage: '500mg' }
    ]
  },
  {
    disease: 'Gastroesophageal Reflux Disease',
    medicines: [
      { name: 'Omeprazole', type: 'Capsule', dosage: '20mg' },
      { name: 'Ranitidine', type: 'Tablet', dosage: '150mg' },
      { name: 'Domperidone', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Chronic Pancreatitis',
    medicines: [
      { name: 'Pancreatic enzymes', type: 'Capsule', dosage: 'As needed' },
      { name: 'Tramadol', type: 'Tablet', dosage: '50mg' },
      { name: 'Insulin', type: 'Injection', dosage: 'As prescribed' }
    ]
  },
  {
    disease: 'Cirrhosis',
    medicines: [
      { name: 'Lactulose', type: 'Syrup', dosage: '15ml' },
      { name: 'Spironolactone', type: 'Tablet', dosage: '100mg' },
      { name: 'Propranolol', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Coronary Artery Disease',
    medicines: [
      { name: 'Atorvastatin', type: 'Tablet', dosage: '20mg' },
      { name: 'Aspirin', type: 'Tablet', dosage: '75mg' },
      { name: 'Metoprolol', type: 'Tablet', dosage: '50mg' }
    ]
  },
  {
    disease: 'Peripheral Artery Disease',
    medicines: [
      { name: 'Cilostazol', type: 'Tablet', dosage: '100mg' },
      { name: 'Clopidogrel', type: 'Tablet', dosage: '75mg' },
      { name: 'Atorvastatin', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Aortic Aneurysm',
    medicines: [
      { name: 'Metoprolol', type: 'Tablet', dosage: '100mg' },
      { name: 'Lisinopril', type: 'Tablet', dosage: '10mg' },
      { name: 'Atorvastatin', type: 'Tablet', dosage: '20mg' }
    ]
  },
  {
    disease: 'Mitral Valve Prolapse',
    medicines: [
      { name: 'Metoprolol', type: 'Tablet', dosage: '25mg' },
      { name: 'Atenolol', type: 'Tablet', dosage: '25mg' },
      { name: 'Aspirin', type: 'Tablet', dosage: '75mg' }
    ]
  },
  {
    disease: 'Acute Bronchiolitis',
    medicines: [
      { name: 'Salbutamol', type: 'Inhaler', dosage: '2.5mg' },
      { name: 'Paracetamol', type: 'Syrup', dosage: '120mg' },
      { name: 'Saline drops', type: 'Drops', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Emphysema',
    medicines: [
      { name: 'Tiotropium', type: 'Inhaler', dosage: '18mcg' },
      { name: 'Salbutamol', type: 'Inhaler', dosage: '100mcg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '30mg' }
    ]
  },
  {
    disease: 'Pulmonary Fibrosis',
    medicines: [
      { name: 'Pirfenidone', type: 'Capsule', dosage: '267mg' },
      { name: 'Nintedanib', type: 'Capsule', dosage: '150mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '20mg' }
    ]
  },
  {
    disease: 'Sarcoidosis',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '40mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' },
      { name: 'Hydroxychloroquine', type: 'Tablet', dosage: '200mg' }
    ]
  },
  {
    disease: 'Chronic Sinusitis',
    medicines: [
      { name: 'Fluticasone', type: 'Spray', dosage: '50mcg' },
      { name: 'Amoxicillin-clavulanate', type: 'Tablet', dosage: '625mg' },
      { name: 'Saline rinse', type: 'Drops', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Addison\'s Disease',
    medicines: [
      { name: 'Hydrocortisone', type: 'Tablet', dosage: '20mg' },
      { name: 'Fludrocortisone', type: 'Tablet', dosage: '0.1mg' },
      { name: 'Dexamethasone', type: 'Injection', dosage: 'Emergency use' }
    ]
  },
  {
    disease: 'Cushing\'s Syndrome',
    medicines: [
      { name: 'Ketoconazole', type: 'Tablet', dosage: '200mg' },
      { name: 'Metyrapone', type: 'Capsule', dosage: '250mg' },
      { name: 'Mifepristone', type: 'Tablet', dosage: '300mg' }
    ]
  },
  {
    disease: 'Polycystic Kidney Disease',
    medicines: [
      { name: 'Tolvaptan', type: 'Tablet', dosage: '15mg' },
      { name: 'Lisinopril', type: 'Tablet', dosage: '10mg' },
      { name: 'Furosemide', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Acute Glomerulonephritis',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Cyclophosphamide', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Furosemide', type: 'Tablet', dosage: '40mg' }
    ]
  },
  {
    disease: 'Nephrotic Syndrome',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Cyclophosphamide', type: 'Tablet', dosage: '50mg' },
      { name: 'Lisinopril', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Huntington\'s Disease',
    medicines: [
      { name: 'Tetrabenazine', type: 'Tablet', dosage: '25mg' },
      { name: 'Haloperidol', type: 'Tablet', dosage: '5mg' },
      { name: 'Deutetrabenazine', type: 'Tablet', dosage: '6mg' }
    ]
  },
  {
    disease: 'Amyotrophic Lateral Sclerosis',
    medicines: [
      { name: 'Riluzole', type: 'Tablet', dosage: '50mg' },
      { name: 'Edaravone', type: 'Injection', dosage: '60mg' },
      { name: 'Baclofen', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Myasthenia Gravis',
    medicines: [
      { name: 'Pyridostigmine', type: 'Tablet', dosage: '60mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Azathioprine', type: 'Tablet', dosage: '50mg' }
    ]
  },
  {
    disease: 'Guillain-Barré Syndrome',
    medicines: [
      { name: 'Immunoglobulin', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' }
    ]
  },
  {
    disease: 'Trigeminal Neuralgia',
    medicines: [
      { name: 'Carbamazepine', type: 'Tablet', dosage: '200mg' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' },
      { name: 'Baclofen', type: 'Tablet', dosage: '10mg' }
    ]
  },
  {
    disease: 'Meniere\'s Disease',
    medicines: [
      { name: 'Betahistine', type: 'Tablet', dosage: '16mg' },
      { name: 'Prochlorperazine', type: 'Tablet', dosage: '5mg' },
      { name: 'Hydrochlorothiazide', type: 'Tablet', dosage: '25mg' }
    ]
  },
  {
    disease: 'Labyrinthitis',
    medicines: [
      { name: 'Prochlorperazine', type: 'Tablet', dosage: '5mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Cyclizine', type: 'Tablet', dosage: '50mg' }
    ]
  },
  {
    disease: 'Acoustic Neuroma',
    medicines: [
      { name: 'Dexamethasone', type: 'Injection', dosage: '4mg' },
      { name: 'Diazepam', type: 'Tablet', dosage: '5mg' },
      { name: 'Meclizine', type: 'Tablet', dosage: '25mg' }
    ]
  },
  {
    disease: 'Macular Degeneration',
    medicines: [
      { name: 'Ranibizumab', type: 'Injection', dosage: '0.5mg' },
      { name: 'Aflibercept', type: 'Injection', dosage: '2mg' },
      { name: 'Vitamin supplements', type: 'Tablet', dosage: 'Daily' }
    ]
  },
  {
    disease: 'Diabetic Retinopathy',
    medicines: [
      { name: 'Ranibizumab', type: 'Injection', dosage: '0.3mg' },
      { name: 'Bevacizumab', type: 'Injection', dosage: '1.25mg' },
      { name: 'Triamcinolone', type: 'Injection', dosage: '4mg' }
    ]
  },
  {
    disease: 'Retinal Detachment',
    medicines: [
      { name: 'Prednisolone', type: 'Drops', dosage: '1%' },
      { name: 'Cyclopentolate', type: 'Drops', dosage: '1%' },
      { name: 'Pilocarpine', type: 'Drops', dosage: '2%' }
    ]
  },
  {
    disease: 'Keratoconus',
    medicines: [
      { name: 'Riboflavin', type: 'Drops', dosage: '0.1%' },
      { name: 'Artificial tears', type: 'Drops', dosage: 'As needed' },
      { name: 'Prednisolone', type: 'Drops', dosage: '1%' }
    ]
  },
  {
    disease: 'Dry Eye Syndrome',
    medicines: [
      { name: 'Artificial tears', type: 'Drops', dosage: 'As needed' },
      { name: 'Cyclosporine', type: 'Drops', dosage: '0.05%' },
      { name: 'Lifitegrast', type: 'Drops', dosage: '5%' }
    ]
  },
  {
    disease: 'Hidradenitis Suppurativa',
    medicines: [
      { name: 'Adalimumab', type: 'Injection', dosage: '40mg' },
      { name: 'Clindamycin', type: 'Gel', dosage: '1%' },
      { name: 'Doxycycline', type: 'Capsule', dosage: '100mg' }
    ]
  },
  {
    disease: 'Vitiligo',
    medicines: [
      { name: 'Tacrolimus', type: 'Ointment', dosage: '0.1%' },
      { name: 'Clobetasol', type: 'Cream', dosage: '0.05%' },
      { name: 'Betamethasone', type: 'Cream', dosage: '0.1%' }
    ]
  },
  {
    disease: 'Pemphigus',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '80mg' },
      { name: 'Azathioprine', type: 'Tablet', dosage: '100mg' },
      { name: 'Rituximab', type: 'Injection', dosage: 'As prescribed' }
    ]
  },
  {
    disease: 'Bullous Pemphigoid',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Doxycycline', type: 'Capsule', dosage: '100mg' },
      { name: 'Clobetasol', type: 'Cream', dosage: '0.05%' }
    ]
  },
  {
    disease: 'Systemic Lupus Erythematosus',
    medicines: [
      { name: 'Hydroxychloroquine', type: 'Tablet', dosage: '200mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '40mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' }
    ]
  },
  {
    disease: 'Sjögren\'s Syndrome',
    medicines: [
      { name: 'Pilocarpine', type: 'Tablet', dosage: '5mg' },
      { name: 'Hydroxychloroquine', type: 'Tablet', dosage: '200mg' },
      { name: 'Artificial tears', type: 'Drops', dosage: 'As needed' }
    ]
  },
  {
    disease: 'Scleroderma',
    medicines: [
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' },
      { name: 'Nifedipine', type: 'Tablet', dosage: '10mg' },
      { name: 'Omeprazole', type: 'Capsule', dosage: '20mg' }
    ]
  },
  {
    disease: 'Polymyositis',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' },
      { name: 'Azathioprine', type: 'Tablet', dosage: '100mg' }
    ]
  },
  {
    disease: 'Dermatomyositis',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' },
      { name: 'Hydroxychloroquine', type: 'Tablet', dosage: '200mg' }
    ]
  },
  {
    disease: 'Giant Cell Arteritis',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '15mg' },
      { name: 'Aspirin', type: 'Tablet', dosage: '75mg' }
    ]
  },
  {
    disease: 'Polymyalgia Rheumatica',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '15mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '10mg' },
      { name: 'Calcium supplements', type: 'Tablet', dosage: '500mg' }
    ]
  },
  {
    disease: 'Takayasu Arteritis',
    medicines: [
      { name: 'Prednisolone', type: 'Tablet', dosage: '60mg' },
      { name: 'Methotrexate', type: 'Tablet', dosage: '20mg' },
      { name: 'Tocilizumab', type: 'Injection', dosage: 'As prescribed' }
    ]
  },
  {
    disease: 'Behcet\'s Disease',
    medicines: [
      { name: 'Colchicine', type: 'Tablet', dosage: '0.5mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '40mg' },
      { name: 'Azathioprine', type: 'Tablet', dosage: '100mg' }
    ]
  },
  {
    disease: 'Kawasaki Disease',
    medicines: [
      { name: 'Immunoglobulin', type: 'Injection', dosage: '2g/kg' },
      { name: 'Aspirin', type: 'Tablet', dosage: '80mg' },
      { name: 'Prednisolone', type: 'Tablet', dosage: '2mg/kg' }
    ]
  },
  {
    disease: 'Marfan Syndrome',
    medicines: [
      { name: 'Metoprolol', type: 'Tablet', dosage: '50mg' },
      { name: 'Losartan', type: 'Tablet', dosage: '50mg' },
      { name: 'Amlodipine', type: 'Tablet', dosage: '5mg' }
    ]
  },
  {
    disease: 'Ehlers-Danlos Syndrome',
    medicines: [
      { name: 'Tramadol', type: 'Tablet', dosage: '50mg' },
      { name: 'Gabapentin', type: 'Capsule', dosage: '300mg' },
      { name: 'Vitamin C', type: 'Tablet', dosage: '1000mg' }
    ]
  },
  {
    disease: 'Osteogenesis Imperfecta',
    medicines: [
      { name: 'Bisphosphonates', type: 'Injection', dosage: 'As prescribed' },
      { name: 'Calcium supplements', type: 'Tablet', dosage: '1000mg' },
      { name: 'Vitamin D', type: 'Tablet', dosage: '800IU' }
    ]
  },
  {
    disease: 'Hemophilia',
    medicines: [
      { name: 'Factor VIII concentrate', type: 'Injection', dosage: 'As needed' },
      { name: 'Desmopressin', type: 'Injection', dosage: '0.3mcg/kg' },
      { name: 'Tranexamic acid', type: 'Tablet', dosage: '1g' }
    ]
  },
  {
    disease: 'Von Willebrand Disease',
    medicines: [
      { name: 'Desmopressin', type: 'Injection', dosage: '0.3mcg/kg' },
      { name: 'Factor VIII concentrate', type: 'Injection', dosage: 'As needed' },
      { name: 'Tranexamic acid', type: 'Tablet', dosage: '1g' }
    ]
  }
];

async function populateDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Disease.deleteMany({});
    await Medicine.deleteMany({});

    // Insert sample diseases
    console.log('📋 Inserting sample diseases...');
    await Disease.insertMany(sampleDiseases);
    console.log(`✅ Inserted ${sampleDiseases.length} diseases`);

    // Insert sample medicines
    console.log('💊 Inserting sample medicines...');
    await Medicine.insertMany(sampleMedicines);
    console.log(`✅ Inserted ${sampleMedicines.length} medicine records`);

    // Create admin user if it doesn't exist
    const adminExists = await Admin.findOne({ username: 'nikhil negi' });
    if (!adminExists) {
      console.log('👤 Creating admin user...');
      const admin = new Admin({
        username: 'nikhil negi',
        passwordHash: 'nikhil_diagnofast', // Will be hashed by pre-save middleware
        email: 'nikhil@diagnofast.com'
      });
      await admin.save();
      console.log('✅ Created admin user (username: nikhil negi, password: nikhil_diagnofast)');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('\n🎉 Database populated successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • ${sampleDiseases.length} diseases added`);
    console.log(`   • ${sampleMedicines.length} medicine records added`);
    console.log('   • Admin user: nikhil negi / nikhil_diagnofast');
    console.log('\n🚀 You can now start the application!');

  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the population script
if (require.main === module) {
  populateDatabase();
}

module.exports = { sampleDiseases, sampleMedicines };
