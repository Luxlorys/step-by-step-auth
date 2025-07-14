import * as XLSX from 'xlsx';

export interface ParsedMember {
  email: string;
  tags: string[];
}

export interface ParseResult {
  members: ParsedMember[];
  errors: string[];
  warnings: string[];
}

const tagOptions = [
  'Business analysis', 'Marketing', 'VIP', 'Management', 'Tech', 
  'Sales', 'Consulting', 'Finance', 'HR', 'Operations'
];

const processTags = (tagsString: string): { validTags: string[], invalidTags: string[] } => {
  if (!tagsString || typeof tagsString !== 'string') {
    return { validTags: [], invalidTags: [] };
  }
  
  const tags = tagsString
    .split(/[,;]/) // Split by comma or semicolon
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  const validTags: string[] = [];
  const invalidTags: string[] = [];
  
  tags.forEach(tag => {
    const matchedTag = tagOptions.find(option => 
      option.toLowerCase() === tag.toLowerCase()
    );
    
    if (matchedTag) {
      if (!validTags.includes(matchedTag)) {
        validTags.push(matchedTag);
      }
    } else {
      invalidTags.push(tag);
    }
  });
  
  return { validTags, invalidTags };
};

export const parseExcelFile = async (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          resolve({ members: [], errors: ['Failed to read file'], warnings: [] });
          return;
        }

        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        if (!worksheet) {
          resolve({ members: [], errors: ['No worksheet found in file'], warnings: [] });
          return;
        }

        const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const members: ParsedMember[] = [];
        const errors: string[] = [];
        const warnings: string[] = [];
        const seenEmails = new Set<string>();

        jsonData.forEach((row, index) => {
          // Skip the first row (header row)
          if (index === 0) return;
          
          if (row && row.length > 0 && row[0]) {
            const emailValue = String(row[0]).trim();
            
            if (emailValue) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(emailValue)) {
                if (!seenEmails.has(emailValue)) {
                  seenEmails.add(emailValue);
                  
                  // Process tags from second column if it exists
                  const tagsValue = row.length > 1 && row[1] ? String(row[1]).trim() : '';
                  const { validTags, invalidTags } = processTags(tagsValue);
                  
                  // Add warnings for invalid tags
                  if (invalidTags.length > 0) {
                    warnings.push(`Row ${index + 1}: Unknown tags "${invalidTags.join(', ')}" for ${emailValue}`);
                  }
                  
                  members.push({
                    email: emailValue,
                    tags: validTags
                  });
                } else {
                  warnings.push(`Row ${index + 1}: Duplicate email "${emailValue}" skipped`);
                }
              } else {
                errors.push(`Row ${index + 1}: "${emailValue}" is not a valid email`);
              }
            }
          }
        });

        resolve({ members, errors, warnings });
      } catch (error) {
        resolve({ 
          members: [], 
          errors: [`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`],
          warnings: []
        });
      }
    };

    reader.onerror = () => {
      resolve({ members: [], errors: ['Failed to read file'], warnings: [] });
    };

    reader.readAsArrayBuffer(file);
  });
};