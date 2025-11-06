import jsPDF from 'jspdf';

interface ResumeData {
  name: string;
  location: string;
  email: string;
  summary: string;
  skills: Record<string, string[]>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
  }>;
  education: {
    degree: string;
    school: string;
    location: string;
    graduated: string;
  };
}

export function generateResumePDF(resumeData: ResumeData) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Color scheme - Professional blue/gray palette
  const primaryColor = [41, 98, 255] as [number, number, number]; // RGB for primary blue
  const darkGray = [51, 51, 51] as [number, number, number];
  const mediumGray = [100, 100, 100] as [number, number, number];
  const lightGray = [240, 240, 240] as [number, number, number];

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin - 10) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Add section header with accent bar
  const addSectionHeader = (title: string) => {
    checkPageBreak(15);
    
    // Colored accent bar
    pdf.setFillColor(...primaryColor);
    pdf.rect(margin, yPosition - 3, 3, 8, 'F');
    
    // Section title
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text(title.toUpperCase(), margin + 6, yPosition + 2);
    yPosition += 6;
    
    // Underline
    pdf.setDrawColor(...lightGray);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 6;
  };

  // ========== HEADER SECTION WITH BACKGROUND ==========
  // Add header background
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 45, 'F');

  // Name
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text(resumeData.name, pageWidth / 2, 20, { align: 'center' });

  // Contact info
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(255, 255, 255);
  
  // Location icon and text
  const contactY = 30;
  const locationText = resumeData.location;
  const emailText = resumeData.email;
  const contactLine = `${locationText}  •  ${emailText}`;
  pdf.text(contactLine, pageWidth / 2, contactY, { align: 'center' });
  
  yPosition = 52;

  yPosition = 52;

  // ========== PROFESSIONAL SUMMARY ==========
  addSectionHeader('Professional Summary');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...darkGray);
  const summaryLines = pdf.splitTextToSize(resumeData.summary, contentWidth);
  summaryLines.forEach((line: string) => {
    checkPageBreak(6);
    pdf.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 4;

  // ========== TECHNICAL SKILLS ==========
  addSectionHeader('Technical Skills');

  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    checkPageBreak(12);
    
    // Category name with background
    pdf.setFillColor(...lightGray);
    pdf.roundedRect(margin, yPosition - 4, contentWidth, 7, 1, 1, 'F');
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text(category, margin + 2, yPosition);
    yPosition += 8;
    
    // Skills as comma-separated with professional styling
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...darkGray);
    pdf.setFontSize(9);
    const skillsText = skills.join('  •  ');
    const skillLines = pdf.splitTextToSize(skillsText, contentWidth - 4);
    skillLines.forEach((line: string) => {
      checkPageBreak(5);
      pdf.text(line, margin + 2, yPosition);
      yPosition += 4.5;
    });
    yPosition += 3;
  });
  yPosition += 2;

  // ========== PROFESSIONAL EXPERIENCE ==========
  addSectionHeader('Professional Experience');

  resumeData.experience.forEach((job) => {
    checkPageBreak(35);
    
    // Job title with icon-like accent
    pdf.setFillColor(...primaryColor);
    pdf.circle(margin + 1.5, yPosition - 1.5, 1.5, 'F');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...darkGray);
    pdf.text(job.title, margin + 5, yPosition);
    yPosition += 6;

    // Company and location
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text(`${job.company}`, margin + 5, yPosition);
    
    // Location on same line, right-aligned
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...mediumGray);
    const locationWidth = pdf.getTextWidth(job.location);
    pdf.text(job.location, pageWidth - margin - locationWidth, yPosition);
    yPosition += 5;

    // Period with subtle styling
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(9);
    pdf.setTextColor(...mediumGray);
    pdf.text(job.period, margin + 5, yPosition);
    yPosition += 6;

    // Highlights with better bullet points
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...darkGray);
    
    job.highlights.forEach((highlight) => {
      checkPageBreak(15);
      
      // Custom bullet point
      pdf.setFillColor(...primaryColor);
      pdf.circle(margin + 7, yPosition - 1.5, 0.8, 'F');
      
      const highlightWidth = contentWidth - 10;
      const lines = pdf.splitTextToSize(highlight, highlightWidth);
      let firstLine = true;
      
      lines.forEach((line: string) => {
        if (!firstLine) {
          checkPageBreak(5);
        }
        pdf.text(line, margin + (firstLine ? 10 : 10), yPosition);
        yPosition += 4.5;
        firstLine = false;
      });
      yPosition += 0.5;
    });
    
    yPosition += 5;
  });

  // ========== EDUCATION ==========
  addSectionHeader('Education');

  // Degree with accent
  pdf.setFillColor(...primaryColor);
  pdf.circle(margin + 1.5, yPosition - 1.5, 1.5, 'F');
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...darkGray);
  pdf.text(resumeData.education.degree, margin + 5, yPosition);
  yPosition += 6;

  // School
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...primaryColor);
  pdf.text(resumeData.education.school, margin + 5, yPosition);
  
  // Location
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...mediumGray);
  const schoolLocationWidth = pdf.getTextWidth(resumeData.education.location);
  pdf.text(resumeData.education.location, pageWidth - margin - schoolLocationWidth, yPosition);
  yPosition += 5;

  // Graduation date
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(9);
  pdf.setTextColor(...mediumGray);
  pdf.text(`Graduated: ${resumeData.education.graduated}`, margin + 5, yPosition);
  yPosition += 8;

  // ========== FOOTER ==========
  // Add a subtle footer on each page
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(...mediumGray);
    pdf.text(
      `${resumeData.name} - Resume`,
      margin,
      pageHeight - 10
    );
    pdf.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin - 20,
      pageHeight - 10
    );
  }

  // Save the PDF
  const fileName = `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`;
  pdf.save(fileName);
}
