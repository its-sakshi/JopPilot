const express = require("express");

const router = express.Router();

// Important resume sections
const sections = [
  "summary",
  "professional summary",
  "objective",
  "education",
  "experience",
  "work experience",
  "internship",
  "projects",
  "technical skills",
  "skills",
  "certifications",
  "achievements",
];

// Technical skills and keywords
const technicalSkills = [
  "python",
  "javascript",
  "typescript",
  "java",
  "c",
  "c++",
  "react",
  "react.js",
  "next.js",
  "node.js",
  "node",
  "express",
  "flask",
  "django",
  "html",
  "html5",
  "css",
  "css3",
  "tailwind",
  "bootstrap",
  "rest api",
  "restful api",
  "api integration",
  "sql",
  "mysql",
  "postgresql",
  "mongodb",
  "redis",
  "docker",
  "aws",
  "azure",
  "git",
  "github",
  "linux",
  "machine learning",
  "deep learning",
  "tensorflow",
  "pytorch",
  "scikit-learn",
  "sklearn",
  "nlp",
  "computer vision",
  "generative ai",
  "llm",
  "llms",
  "prompt engineering",
  "openai",
  "data analysis",
  "pandas",
  "numpy",
  "power bi",
  "excel",
  "flask",
  "graphql",
  "websocket",
  "ci/cd",
  "kubernetes",
];

// Analyze resume text
function analyzeResume(resumeText) {
  const text = resumeText.toLowerCase();

  // -----------------------------------------
  // 1. Detect skills
  // -----------------------------------------

  const skillAliases = {
  "react.js": ["react.js", "react"],
  "next.js": ["next.js", "nextjs"],
  "node.js": ["node.js", "node"],
  "rest api": ["rest api", "restful api", "rest apis"],
  "c++": ["c++"],
  "scikit-learn": ["scikit-learn", "sklearn"],
  "llm": ["llm", "llms"],
  "ci/cd": ["ci/cd"],
};

const detectedSkills = [];

for (const skill of technicalSkills) {
  const aliases = skillAliases[skill] || [skill];

  const found = aliases.some((alias) => {
    const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(
      `(^|[^a-zA-Z0-9+#])${escapedAlias}(?=$|[^a-zA-Z0-9+#])`,
      "i"
    );

    return regex.test(resumeText);
  });

  if (found) {
    detectedSkills.push(skill);
  }
  }

// Remove duplicate skills
  const uniqueSkills = [...new Set(detectedSkills)];

  // -----------------------------------------
  // 2. Detect resume sections
  // -----------------------------------------

  const detectedSections = sections.filter((section) =>
    text.includes(section.toLowerCase())
  );

  // -----------------------------------------
  // 3. Contact information
  // -----------------------------------------

  const hasEmail =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);

  const hasPhone =
    /(?:\+?\d[\d\s().-]{8,}\d)/.test(resumeText);

  const hasLinkedIn = text.includes("linkedin");

  const hasGitHub = text.includes("github");

  // -----------------------------------------
  // 4. Important sections
  // -----------------------------------------

  const hasSummary =
    text.includes("professional summary") ||
    text.includes("summary") ||
    text.includes("objective");

  const hasEducation = text.includes("education");

  const hasExperience =
    text.includes("experience") ||
    text.includes("intern");

  const hasProjects = text.includes("projects");

  const hasSkills =
    text.includes("technical skills") ||
    text.includes("skills");

  // -----------------------------------------
  // 5. Formatting analysis
  // -----------------------------------------

  let formattingScore = 60;

  if (hasEmail) formattingScore += 5;
  if (hasPhone) formattingScore += 5;
  if (hasLinkedIn) formattingScore += 5;
  if (hasGitHub) formattingScore += 5;

  if (detectedSections.length >= 5) {
    formattingScore += 10;
  }

  formattingScore = Math.min(formattingScore, 100);

  // -----------------------------------------
  // 6. Keyword score
  // -----------------------------------------

  const keywordScore = Math.min(
    60 + uniqueSkills.length * 3,
    100
  );

  // -----------------------------------------
  // 7. Skills score
  // -----------------------------------------

  const skillsScore = Math.min(
    55 + uniqueSkills.length * 4,
    100
  );

  // -----------------------------------------
  // 8. Content quality score
  // -----------------------------------------

  let contentScore = 60;

  if (hasSummary) contentScore += 8;
  if (hasEducation) contentScore += 7;
  if (hasExperience) contentScore += 8;
  if (hasProjects) contentScore += 7;
  if (hasSkills) contentScore += 5;

  // Look for measurable achievements
  const measurableResults =
    /\b\d+(\.\d+)?\s*(%|percent|users|projects|years|months|accuracy|x|k|m)\b/i.test(
      resumeText
    );

  if (measurableResults) {
    contentScore += 5;
  }

  contentScore = Math.min(contentScore, 100);

  // -----------------------------------------
  // 9. Overall ATS score
  // -----------------------------------------

  const atsScore = Math.round(
    keywordScore * 0.3 +
      formattingScore * 0.25 +
      skillsScore * 0.25 +
      contentScore * 0.2
  );

  // -----------------------------------------
  // 10. Missing recommended keywords
  // -----------------------------------------

  const recommendedKeywords = [
    "Docker",
    "AWS",
    "Redis",
    "CI/CD",
    "PostgreSQL",
    "REST APIs",
    "Testing",
    "Agile",
  ];

  const missingKeywords = recommendedKeywords.filter(
    (keyword) => !text.includes(keyword.toLowerCase())
  );

  // -----------------------------------------
  // 11. Recommendations
  // -----------------------------------------

  const recommendations = [];

  if (!measurableResults) {
    recommendations.push({
      title: "Add measurable impact",
      description:
        "Quantify your achievements with numbers, percentages, performance improvements, or measurable outcomes.",
    });
  }

  if (!hasSummary) {
    recommendations.push({
      title: "Add a professional summary",
      description:
        "Add a concise summary highlighting your experience, strongest skills, and target role.",
    });
  }

  if (!hasProjects) {
    recommendations.push({
      title: "Add relevant projects",
      description:
        "Include 2–3 relevant projects with technologies used and measurable results.",
    });
  }

  if (missingKeywords.length > 0) {
    recommendations.push({
      title: "Strengthen technical keywords",
      description:
        `Consider adding relevant technologies such as ${missingKeywords
          .slice(0, 4)
          .join(", ")} where they genuinely match your experience.`,
    });
  }

  if (!hasLinkedIn) {
    recommendations.push({
      title: "Add LinkedIn profile",
      description:
        "Include a professional LinkedIn profile URL so recruiters can learn more about your experience.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Keep your resume targeted",
      description:
        "Your resume has a strong structure. Tailor keywords and achievements for each job description.",
    });
  }

  // -----------------------------------------
  // Return analysis
  // -----------------------------------------

  return {
    atsScore,

    breakdown: {
      keywords: keywordScore,
      formatting: formattingScore,
      skills: skillsScore,
      contentQuality: contentScore,
    },

    detectedSkills: uniqueSkills,

    missingKeywords,

    sections: detectedSections,

    contactInformation: {
      email: hasEmail,
      phone: hasPhone,
      linkedin: hasLinkedIn,
      github: hasGitHub,
    },

    recommendations,
  };
}

// POST /api/analyze/resume
router.post("/resume", (req, res) => {
  try {
    const { resumeText } = req.body;

    // Validate input
    if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    if (resumeText.trim().length < 100) {
      return res.status(400).json({
        success: false,
        message: "Resume text is too short to analyze.",
      });
    }

    const analysis = analyzeResume(resumeText);

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze resume.",
      error: error.message,
    });
  }
});


// POST /api/analyze/job-match
router.post("/job-match", (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    // Validate resume
    if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    // Validate job description
    if (!jobDescription || typeof jobDescription !== "string") {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    if (resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Resume text is too short.",
      });
    }

    if (jobDescription.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Job description is too short.",
      });
    }

    const resume = resumeText.toLowerCase();
    const job = jobDescription.toLowerCase();

    // Keywords used for job matching
    const jobSkillPatterns = [
  { name: "Python", pattern: /\bpython\b/i },
  { name: "JavaScript", pattern: /\bjavascript\b/i },
  { name: "TypeScript", pattern: /\btypescript\b/i },
  { name: "Java", pattern: /\bjava\b/i },

  {
    name: "C",
    pattern: /(^|[^a-z0-9+#])c([^a-z0-9+#]|$)/i,
  },

  {
    name: "C++",
    pattern: /(^|[^a-z0-9])c\+\+([^a-z0-9]|$)/i,
  },

  {
    name: "React",
    pattern: /\breact(?:\.js)?\b/i,
  },

  {
    name: "Next.js",
    pattern: /\bnext(?:\.js|js)?\b/i,
  },

  {
    name: "Node.js",
    pattern: /\bnode(?:\.js|js)?\b/i,
  },

  {
    name: "Express",
    pattern: /\bexpress(?:\.js)?\b/i,
  },

  {
    name: "Flask",
    pattern: /\bflask\b/i,
  },

  {
    name: "Django",
    pattern: /\bdjango\b/i,
  },

  {
    name: "HTML",
    pattern: /\bhtml(?:5)?\b/i,
  },

  {
    name: "CSS",
    pattern: /\bcss(?:3)?\b/i,
  },

  {
    name: "Tailwind CSS",
    pattern: /\btailwind(?:\s+css)?\b/i,
  },

  {
    name: "SQL",
    pattern: /\bsql\b/i,
  },

  {
    name: "MySQL",
    pattern: /\bmysql\b/i,
  },

  {
    name: "PostgreSQL",
    pattern: /\bpostgres(?:ql)?\b/i,
  },

  {
    name: "MongoDB",
    pattern: /\bmongodb\b/i,
  },

  {
    name: "Redis",
    pattern: /\bredis\b/i,
  },

  {
    name: "Docker",
    pattern: /\bdocker\b/i,
  },

  {
    name: "AWS",
    pattern: /\baws\b/i,
  },

  {
    name: "Azure",
    pattern: /\bazure\b/i,
  },

  {
    name: "Git",
    pattern: /\bgit\b/i,
  },

  {
    name: "GitHub",
    pattern: /\bgithub\b/i,
  },

  {
    name: "Linux",
    pattern: /\blinux\b/i,
  },

  {
    name: "Machine Learning",
    pattern: /\bmachine learning\b/i,
  },

  {
    name: "Deep Learning",
    pattern: /\bdeep learning\b/i,
  },

  {
    name: "TensorFlow",
    pattern: /\btensorflow\b/i,
  },

  {
    name: "PyTorch",
    pattern: /\bpytorch\b/i,
  },

  {
    name: "Scikit-learn",
    pattern: /\b(?:scikit-learn|sklearn)\b/i,
  },

  {
    name: "NLP",
    pattern: /\bnlp\b/i,
  },

  {
    name: "Computer Vision",
    pattern: /\bcomputer vision\b/i,
  },

  {
    name: "Generative AI",
    pattern: /\bgenerative ai\b/i,
  },

  {
    name: "LLM",
    pattern: /\bllms?\b/i,
  },

  {
    name: "OpenAI",
    pattern: /\bopenai\b/i,
  },

  {
    name: "Pandas",
    pattern: /\bpandas\b/i,
  },

  {
    name: "NumPy",
    pattern: /\bnumpy\b/i,
  },

  {
    name: "Power BI",
    pattern: /\bpower bi\b/i,
  },

  {
    name: "Excel",
    pattern: /\bexcel\b/i,
  },

  {
    name: "GraphQL",
    pattern: /\bgraphql\b/i,
  },

  {
    name: "WebSocket",
    pattern: /\bwebsockets?\b/i,
  },

  {
    name: "REST API",
    pattern: /\brest(?:ful)?\s+apis?\b/i,
  },

  {
    name: "API Integration",
    pattern: /\bapi integration\b/i,
  },

  {
    name: "CI/CD",
    pattern: /\bci\s*\/\s*cd\b/i,
  },

  {
    name: "Kubernetes",
    pattern: /\bkubernetes\b/i,
  },

  {
    name: "Testing",
    pattern: /\btesting\b/i,
  },

  {
    name: "Jest",
    pattern: /\bjest\b/i,
  },

  {
    name: "Playwright",
    pattern: /\bplaywright\b/i,
  },

  {
    name: "Agile",
    pattern: /\bagile\b/i,
  },

  {
    name: "Scrum",
    pattern: /\bscrum\b/i,
  },
  ];

  const jobKeywords = jobSkillPatterns
  .filter(({ pattern }) => pattern.test(job))
  .map(({ name }) => name);

  const matchedKeywords = jobSkillPatterns
  .filter(
    ({ name, pattern }) =>
      jobKeywords.includes(name) && pattern.test(resume)
  )
  .map(({ name }) => name);

  const missingKeywords = jobKeywords.filter(
  (keyword) => !matchedKeywords.includes(keyword)
  );

    // Calculate match score
    let matchScore = 50;

  if (jobKeywords.length > 0) {
    const coreSkills = new Set([
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C",
    "C++",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Flask",
    "Django",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "Azure",
    "REST API",
    "API Integration",
    "GraphQL",
    "WebSocket",
    ]);

    const preferredSkills = new Set([
    "Git",
    "GitHub",
    "Linux",
    "Testing",
    "Jest",
    "Playwright",
    "Agile",
    "Scrum",
    ]);

    const strongContextWords = [
    "built",
    "developed",
    "implemented",
    "created",
    "designed",
    "integrated",
    "deployed",
    "worked with",
    "using",
    "used",
    "experience with",
    ];

    const resumeSentences = resume
    .split(/[.!?\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

    let coreTotal = 0;
    let coreMatched = 0;

    let preferredTotal = 0;
    let preferredMatched = 0;

    let contextTotal = 0;
    let contextMatched = 0;

    for (const keyword of jobKeywords) {
    const isCore = coreSkills.has(keyword);
    const isPreferred = preferredSkills.has(keyword);

    if (isCore) {
      coreTotal++;

      if (matchedKeywords.includes(keyword)) {
        coreMatched++;
      }
    } else if (isPreferred) {
      preferredTotal++;

      if (matchedKeywords.includes(keyword)) {
        preferredMatched++;
      }
    }

    if (matchedKeywords.includes(keyword)) {
      const escapedKeyword = keyword.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const skillRegex = new RegExp(
        `(^|[^a-zA-Z0-9+#])${escapedKeyword}(?=$|[^a-zA-Z0-9+#])`,
        "i"
      );

      const hasContext = resumeSentences.some((sentence) => {
        if (!skillRegex.test(sentence)) {
          return false;
        }

        return strongContextWords.some((contextWord) => {
          const escapedContext = contextWord.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );

          const contextRegex = new RegExp(
            `\\b${escapedContext}\\b`,
            "i"
          );

          return contextRegex.test(sentence);
        });
      });

      contextTotal++;

      if (hasContext) {
        contextMatched++;
      }
    }
  }

  const coreScore =
    coreTotal > 0
      ? (coreMatched / coreTotal) * 100
      : 100;

  const preferredScore =
    preferredTotal > 0
      ? (preferredMatched / preferredTotal) * 100
      : 100;

  const contextScore =
    contextTotal > 0
      ? (contextMatched / contextTotal) * 100
      : 0;

  matchScore = Math.round(
    coreScore * 0.55 +
    preferredScore * 0.20 +
    contextScore * 0.25
  );

  matchScore = Math.max(0, Math.min(matchScore, 100));
}

    // Generate recommendations
    const recommendations = [];

    if (missingKeywords.length > 0) {
      recommendations.push({
        title: "Add missing technical keywords",
        description: `Your resume is missing ${missingKeywords
          .slice(0, 5)
          .join(", ")}. Add them only if you genuinely have experience with these technologies.`,
      });
    }

    if (matchScore < 60) {
      recommendations.push({
        title: "Improve your job match",
        description:
          "Your resume currently has limited overlap with this job description. Highlight the most relevant projects, skills, and experience.",
      });
    } else if (matchScore < 80) {
      recommendations.push({
        title: "Strengthen relevant experience",
        description:
          "Your resume has a reasonable match. Tailor your project and experience descriptions to emphasize the requirements of this role.",
      });
    } else {
      recommendations.push({
        title: "Strong job match",
        description:
          "Your resume contains many of the technical keywords required for this position. Focus on measurable achievements and role-specific accomplishments.",
      });
    }

    if (!resume.includes("experience") && !resume.includes("internship")) {
      recommendations.push({
        title: "Highlight experience",
        description:
          "Make sure your resume clearly explains relevant internships, work experience, or practical projects.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job match analyzed successfully.",
      match: {
        matchScore,
        matchedKeywords,
        missingKeywords,
        totalJobKeywords: jobKeywords.length,
        matchedCount: matchedKeywords.length,
        missingCount: missingKeywords.length,
        recommendations,
      },
    });
  } catch (error) {
    console.error("Job match analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze job match.",
      error: error.message,
    });
  }
});

module.exports = router;
module.exports = router;