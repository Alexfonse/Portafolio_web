const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function analyzeImage(filePath) {
    try {
        const metadata = await sharp(filePath).metadata();
        const stats = await fs.stat(filePath);
        
        return {
            filename: path.basename(filePath),
            path: filePath.replace(/\\/g, '/'),
            format: metadata.format,
            width: metadata.width,
            height: metadata.height,
            sizeBytes: stats.size,
            sizeKB: (stats.size / 1024).toFixed(2),
            sizeMB: (stats.size / (1024 * 1024)).toFixed(3),
            hasAlpha: metadata.hasAlpha,
            space: metadata.space,
            channels: metadata.channels,
            density: metadata.density || 'N/A'
        };
    } catch (error) {
        return {
            filename: path.basename(filePath),
            error: error.message
        };
    }
}

async function analyzeDirectory(dirPath) {
    const results = [];
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const file of files) {
        const fullPath = path.join(dirPath, file.name);
        
        if (file.isDirectory()) {
            const subResults = await analyzeDirectory(fullPath);
            results.push(...subResults);
        } else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name)) {
            const analysis = await analyzeImage(fullPath);
            results.push(analysis);
        }
    }
    
    return results;
}

async function main() {
    const imgDir = path.join(__dirname, 'assets', 'img');
    
    console.log('🔍 Analyzing images in:', imgDir);
    console.log('Please wait...\n');
    
    const results = await analyzeDirectory(imgDir);
    
    // Sort by size (largest first)
    results.sort((a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0));
    
    // Generate report
    let totalSize = 0;
    let report = '# 📊 IMAGE ANALYSIS REPORT\n\n';
    report += `**Analysis Date:** ${new Date().toISOString()}\n`;
    report += `**Total Images:** ${results.length}\n\n`;
    
    report += '## 📁 Image Inventory\n\n';
    report += '| Filename | Format | Dimensions | Size | Issues |\n';
    report += '|----------|--------|------------|------|--------|\n';
    
    for (const img of results) {
        if (img.error) {
            report += `| ${img.filename} | ERROR | - | - | ${img.error} |\n`;
        } else {
            totalSize += img.sizeBytes;
            const issues = [];
            
            // Check for optimization opportunities
            if (img.format === 'png' && !img.hasAlpha) issues.push('PNG without alpha');
            if (img.sizeBytes > 500000) issues.push('Large file (>500KB)');
            if (img.width > 2000) issues.push('Very wide');
            
            report += `| ${img.filename} | ${img.format} | ${img.width}x${img.height} | ${img.sizeKB}KB | ${issues.join(', ') || '-'} |\n`;
        }
    }
    
    report += `\n**Total Size:** ${(totalSize / (1024 * 1024)).toFixed(2)} MB\n\n`;
    
    // Recommendations
    report += '## 💡 Optimization Recommendations\n\n';
    const largeImages = results.filter(img => img.sizeBytes > 500000);
    const pngWithoutAlpha = results.filter(img => img.format === 'png' && !img.hasAlpha);
    
    if (largeImages.length > 0) {
        report += `### Large Files (${largeImages.length} files)\n`;
        largeImages.forEach(img => {
            report += `- \`${img.filename}\` (${img.sizeMB}MB) - Consider compression\n`;
        });
        report += '\n';
    }
    
    if (pngWithoutAlpha.length > 0) {
        report += `### PNG without Transparency (${pngWithoutAlpha.length} files)\n`;
        pngWithoutAlpha.forEach(img => {
            report += `- \`${img.filename}\` - Convert to JPG or WebP\n`;
        });
        report += '\n';
    }
    
    // Save report
    const reportPath = path.join(__dirname, 'image_analysis_report.md');
    await fs.writeFile(reportPath, report);
    
    console.log('✅ Analysis complete!');
    console.log(`📄 Report saved to: ${reportPath}`);
    console.log(`\n📊 Summary:`);
    console.log(`   Total images: ${results.length}`);
    console.log(`   Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`   Large files (>500KB): ${largeImages.length}`);
}

main().catch(console.error);
